# hourly image Apps

DevOps With Kubernetes Training

- Chapter 2 Submission 13

## First install dependency:

```bash
npm install
# or
npm ci
```

## Run with kubernetes/docker

```bash
# Docker command
docker build -t {project_name} .
docker tag {project_name} {project_name}
docker push {project_name}

# Kubernetes command
kubectl apply -f manifests/pv.yaml
kubectl apply -f manifests/pv-claim.yaml
kubectl apply -f manifests/deployment.yaml
kubectl apply -f manifests/ingress.yaml
kubectl apply -f manifests/service.yaml
```

### Access it with

```bash
http://localhost:8081
```
