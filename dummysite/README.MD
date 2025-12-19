# DummySite Controller

A Kubernetes operator that automatically deploys websites as containerized applications.

## Overview

The DummySite controller watches for `DummySite` custom resources in your Kubernetes cluster and automatically:

- Fetches the website HTML from a specified URL
- Creates a ConfigMap to store the HTML content
- Deploys an Nginx pod to serve the website
- Exposes the website via a Kubernetes Service

## Prerequisites

- Kubernetes cluster (1.19+)
- Node.js 14+ (for development)
- kubectl configured to access your cluster

## Installation

1. Build & Deploy Image

```bash
bash -c ./buildanddeploy.sh
```

2. Install the CRD:

```bash
kubectl apply -f manifests/crd.yaml
```

3. Create the service account and RBAC:

```bash
kubectl apply -f manifests/rbac.yaml
```

4. Deploy the controller:

```bash
kubectl apply -f manifests/controller-deployment.yaml
```

## Usage

Create a DummySite resource:

```yaml
apiVersion: web.example.com/v1
kind: DummySite
metadata:
  name: example-site
spec:
  website_url: https://example.com/
```

Apply it:

```bash
kubectl apply -f example-site.yaml
```

The controller will automatically create:

- ConfigMap: `example-site-html`
- Deployment: `example-site`
- Service: `example-site`

Access the website:

```bash
kubectl port-forward svc/example-site 8080:80
# Visit http://localhost:8080
```

## Architecture

- **ConfigMap**: Stores the fetched website HTML
- **Deployment**: Runs Nginx containers with the HTML mounted as a volume
- **Service**: Exposes the Nginx pods internally (ClusterIP)
