# Todo Apps

DevOps With Kubernetes Training

- Chapter 3 Submission 9

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
  --namespace project \
  --image=postgres \
  psql-test -- \
  psql postgres://postgres:postgres@postgres:5432/todoapps


CREATE TABLE IF NOT EXISTS todo (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title TEXT NOT NULL
);

INSERT INTO todo (title)
VALUES ('Learn Kubernetes');

SELECT * FROM todo;


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

### [2.9] 2025-12-08

**[ADDED]**

- Cronjob.yaml
