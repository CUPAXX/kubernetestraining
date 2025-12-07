# Ping Pong Apps

DevOps With Kubernetes Training

- Chapter 3 Submission 7

## First install dependency:

```bash
npm install
# or
npm ci
```

## Build project using docker

```bash
# Docker command
docker build -t {username}/{project_name} .
docker tag {username}/{project_name} {dockerhub_username}/{project_name}
docker push {dockerhub_username}/{project_name}
```

## Prepare Postgres in Kubernetes

```bash
# Kubernetes command
kubectl apply -f manifests/postgres-secret.yaml
kubectl apply -f manifests/postgres-stful.yaml
kubectl apply -f manifests/postgres-stful.yaml
```

## Create table

```bash
kubectl run -it --rm \
  --restart=Never \
  --namespace exercises \
  --image=postgres \
  psql-test -- \
  psql -h postgres -U postgres -d pingpong


CREATE TABLE IF NOT EXISTS counter (
  id INTEGER PRIMARY KEY,
  value INTEGER NOT NULL
);

INSERT INTO counter (id, value)
VALUES (1, 0)
ON CONFLICT DO NOTHING;


exit
```

## Deploy app to kubernetes

```bash
kubectl apply -f manifests/configmap.yaml
kubectl apply -f manifests/deployment.yaml
kubectl apply -f manifests/ingress.yaml
kubectl apply -f manifests/service.yaml
```

### Access it with

```bash
http://localhost:8081
```
