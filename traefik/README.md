# Traefik

Traefik fue instalado usando Helm dentro del namespace traefik.

Comandos utilizados:

helm repo add traefik https://traefik.github.io/charts
helm repo update
kubectl create namespace traefik
helm install traefik traefik/traefik -n traefik
