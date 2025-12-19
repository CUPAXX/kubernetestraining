# Instructions for Exercise 5.2

i installed the Istio CLI using Chocolatey with command:

```bash
choco install istioctl -y
istioctl version
```

then install in to k3d cluster:

```bash
istioctl install --set profile=ambient --set values.global.platform=k3d
```

Install the Kubernetes Gateway API CRDs

```bash
kubectl get crd gateways.gateway.networking.k8s.io &> /dev/null || \
  kubectl apply --server-side -f https://github.com/kubernetes-sigs/gateway-api/releases/download/v1.4.0/experimental-install.yaml
```

Add Injection label

```bash
kubectl label namespace default istio-injection=enabled
```

Deploying application

```bash
kubectl apply -f https://raw.githubusercontent.com/istio/istio/release-1.28/samples/bookinfo/platform/kube/bookinfo.yaml
kubectl apply -f https://raw.githubusercontent.com/istio/istio/release-1.28/samples/bookinfo/platform/kube/bookinfo-versions.yaml
```

deploy gateway

```bash
kubectl apply -f https://raw.githubusercontent.com/istio/istio/release-1.28/samples/bookinfo/gateway-api/bookinfo-gateway.yaml
```

anotating the gateway

```bash
kubectl annotate gateway bookinfo-gateway networking.istio.io/service-type=ClusterIP --namespace=default
```

open port-forward

```bash
kubectl port-forward svc/bookinfo-gateway-istio 8080:80
```

then we can access the `localhost:8080/productpage`

for uninstall or cleanup

```bash
curl -sL https://raw.githubusercontent.com/istio/istio/release-1.28/samples/bookinfo/platform/kube/cleanup.sh | bash
kubectl delete -f https://raw.githubusercontent.com/istio/istio/release-1.28/samples/bookinfo/platform/kube/bookinfo.yaml
kubectl delete -f https://raw.githubusercontent.com/istio/istio/release-1.28/samples/bookinfo/platform/kube/bookinfo-versions.yaml
kubectl delete -f https://raw.githubusercontent.com/istio/istio/release-1.28/samples/bookinfo/gateway-api/bookinfo-gateway.yaml
```
