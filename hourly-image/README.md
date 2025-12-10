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

## Chapter 4 Submission 9

DBaaS vs DIY

## Answer

## Database Options Comparison

There are two main ways to use PostgreSQL in Google Kubernetes Engine (GKE):

1. Using Google Cloud SQL (DBaaS)
2. Running PostgreSQL in Kubernetes using PersistentVolumeClaims (PVC)

---

### Google Cloud SQL (DBaaS)

**Pros:**

- Easy and fast to set up
- Google handles updates, backups, and availability
- Automatic backups and recovery

**Cons:**

- More expensive
- Less control over configuration
- Google Cloud specific

---

### PostgreSQL on GKE with PVC

**Pros:**

- Cheaper
- Full control of PostgreSQL settings
- Good for learning Kubernetes

**Cons:**

- More setup and maintenance required
- Backups must be done manually
- Higher risk if misconfigured

---

### Summary

Cloud SQL is simpler and safer but costs more.  
Running PostgreSQL in GKE is cheaper and flexible but needs more work and maintenance.
