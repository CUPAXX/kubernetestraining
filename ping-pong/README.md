# Ping Pong Apps

DevOps With Kubernetes Training

- Chapter 4 Submission 1

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
kubectl apply -f manifests/postgres-service.yaml
```

## Create table

```bash
kubectl run -it --rm \
  --restart=Never \
  --namespace exercises \
  --image=postgres \
  psql-test -- \
  psql postgres://postgres:postgres@postgres:5432/pingpong


CREATE TABLE IF NOT EXISTS counter (
  id INTEGER PRIMARY KEY,
  value INTEGER NOT NULL
);

INSERT INTO counter (id, value)
VALUES (1, 0)
ON CONFLICT DO NOTHING;

SELECT * FROM counter;


exit
```

## Deploy app to kubernetes

```bash
kubectl apply -f manifests/configmap.yaml
kubectl apply -f manifests/deployment.yaml
kubectl apply -f manifests/service.yaml
kubectl apply -f manifests/ingress.yaml
```

### Access it with

```bash
http://localhost:8081
```

## Change Logs

All notable changes to this project will be documented in this section

### [3.1] 2025-12-09

**[UPDATE]**

- migrate to gcp cluster
