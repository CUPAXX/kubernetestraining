const k8s = require("@kubernetes/client-node");
const axios = require("axios");

console.log("DummySite controller started");

const kc = new k8s.KubeConfig();
kc.loadFromCluster();

const coreApi = kc.makeApiClient(k8s.CoreV1Api);
const appsApi = kc.makeApiClient(k8s.AppsV1Api);
const watch = new k8s.Watch(kc);

const NAMESPACE = "default";

/* -------------------- Helpers -------------------- */

async function ensureConfigMap(siteName, html) {
  console.log("Ensuring ConfigMap for", siteName);
  if (!siteName) {
    throw new Error("siteName is undefined in ensureConfigMap");
  }

  const cmName = `${siteName}-html`;
  console.log("ConfigMap name:", cmName);

  try {
    await coreApi.readNamespacedConfigMap({
      name: cmName,
      namespace: NAMESPACE,
    });
    console.log("ConfigMap exists");
    return;
  } catch (err) {
    if (err.statusCode && err.statusCode !== 404) {
      throw err;
    }

    console.log(`Creating ConfigMap ${cmName}`);
    await coreApi.createNamespacedConfigMap({
      namespace: NAMESPACE,
      body: {
        metadata: { name: cmName },
        data: { "index.html": html },
      },
    });
  }
}

async function ensureDeployment(siteName) {
  console.log("Ensuring Deployment for", siteName);
  if (!siteName) {
    throw new Error("siteName is undefined in ensureDeployment");
  }

  try {
    await appsApi.readNamespacedDeployment({
      name: siteName,
      namespace: NAMESPACE,
    });
    console.log(`Deployment ${siteName} already exists`);
    return;
  } catch (err) {
    if (err.statusCode && err.statusCode !== 404) {
      throw err;
    }

    console.log(`Creating Deployment ${siteName}`);
    await appsApi.createNamespacedDeployment({
      namespace: NAMESPACE,
      body: {
        metadata: { name: siteName },
        spec: {
          replicas: 1,
          selector: { matchLabels: { app: siteName } },
          template: {
            metadata: { labels: { app: siteName } },
            spec: {
              containers: [
                {
                  name: "nginx",
                  image: "nginx:alpine",
                  ports: [{ containerPort: 80 }],
                  volumeMounts: [
                    {
                      name: "html",
                      mountPath: "/usr/share/nginx/html",
                    },
                  ],
                },
              ],
              volumes: [
                {
                  name: "html",
                  configMap: { name: `${siteName}-html` },
                },
              ],
            },
          },
        },
      },
    });
  }
}

async function ensureService(siteName) {
  console.log("Ensuring Service for", siteName);
  if (!siteName) {
    throw new Error("siteName is undefined in ensureService");
  }

  try {
    await coreApi.readNamespacedService({
      name: siteName,
      namespace: NAMESPACE,
    });
    console.log(`Service ${siteName} already exists`);
    return;
  } catch (err) {
    if (err.statusCode && err.statusCode !== 404) {
      throw err;
    }

    console.log(`Creating Service ${siteName}`);
    await coreApi.createNamespacedService({
      namespace: NAMESPACE,
      body: {
        metadata: { name: siteName },
        spec: {
          selector: { app: siteName },
          ports: [{ port: 80, targetPort: 80 }],
          type: "ClusterIP",
        },
      },
    });
  }
}

/* -------------------- Reconcile -------------------- */

async function reconcile(dummysite) {
  console.log("Reconciling DummySite", dummysite);
  if (!dummysite?.metadata?.name) {
    console.log("Skipping event without metadata.name");
    return;
  }

  if (!dummysite?.spec?.website_url) {
    console.log("Skipping event without spec.website_url");
    return;
  }

  const siteName = dummysite.metadata.name;
  const websiteUrl = dummysite.spec.website_url;

  console.log(`Processing DummySite ${NAMESPACE}/${siteName}`);

  const response = await axios.get(websiteUrl, { timeout: 10000 });
  const html = response.data;

  await ensureConfigMap(siteName, html);
  await ensureDeployment(siteName);
  await ensureService(siteName);
}

/* -------------------- Watch -------------------- */

watch.watch(
  `/apis/web.example.com/v1/namespaces/${NAMESPACE}/dummysites`,
  {},
  async (type, obj) => {
    if (type === "BOOKMARK") return;

    if (type === "ADDED" || type === "MODIFIED") {
      try {
        await reconcile(obj);
      } catch (err) {
        console.error("Reconcile failed:", err.message);
      }
    }
  },
  (err) => {
    console.error("Watch error:", err);
    process.exit(1);
  }
);
