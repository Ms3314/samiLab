---
source: "A fuller write-up is coming. For now, the videos below walk through the whole build."
---

## What it is

A continuous integration and delivery setup on Azure, built end to end and recorded as a two-part walkthrough.

## The pieces

- **Azure DevOps** runs the pipeline: it builds the app and its container image on every push.
- **AKS** (Azure Kubernetes Service) runs the app.
- **ArgoCD** watches the deployment manifests in Git and keeps the cluster in sync with them, so a merge is a deploy.
- **A VM** sits alongside the cluster.
