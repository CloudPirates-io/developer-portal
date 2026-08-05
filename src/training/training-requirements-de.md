# Voraussetzungen zur Teilnahme an Unseren Kubernetes Schulungen

Während der Schulungen werden viele praktische Übungen durchgeführt, um das theoretische Wissen
zu vertiefen. Dadurch ergeben sich für die Schulungsteilnehmer folgende Voraussetzungen:

## Zugriff auf Demo-Files

Der Quellcode für alle Übungen liegt auf einem von uns betriebenen
[Soft-Serve](https://github.com/charmbracelet/soft-serve)-Git-Server. Der Zugriff erfolgt per SSH:

```bash
ssh git.cloudpirates.io
```

Dies öffnet eine interaktive Terminal-Oberfläche, über die sich die verfügbaren Repositories
durchsuchen lassen. Dort können Dateiinhalte eingesehen und der `git clone`-Befehl für das
benötigte Repository kopiert werden, zum Beispiel:

```bash
git clone https://git.cloudpirates.io/kind-cluster.git
```

## Container Runtime: Installiertes Docker Desktop ODER Podman

Über die Container Runtime werden zum einen die Übungen für Container durchgeführt, zum anderen
wird dieses als Basis für KIND (Kubernetes in Docker) benötigt. Aufgrund des neuen Lizenzmodells
von Docker Desktop verwenden wir gerne als alternative Podman. Beide Tools funktionieren in der
Bedienung exakt identisch.

Installation Podman: <https://podman.io/getting-started/>

Installation Docker Desktop: <https://www.docker.com/products/docker-desktop>

Eine Funktionsprüfung kann je nach verwendeter Container Runtime über Docker (z.B. docker ps) oder
Podman (z.B. podman ps) wie folgt durchgeführt werden:

```text
~ podman|docker ps
CONTAINER ID IMAGE COMMAND CREATED STATUS PORTS NAMES

~ podman|docker run -d -p 8080:80 nginx:alpine
Unable to find image 'nginx:alpine' locally
alpine: Pulling from library/nginx
540db60ca938: Pull complete
0ae30075c5da: Pull complete
9da81141e74e: Pull complete
b2e41dd2ded0: Pull complete
7f40e809fb2d: Pull complete
758848c48411: Pull complete
Digest: sha256:cc8c413c74aba9fef9dae7f3da736725136bad1e3f24fbc93788aea1944f51c4
Status: Downloaded newer image for nginx:alpine
03d9355e1878ca71af0f483259cfb76997e2a8aefc81518a8a5eecc75df28e1b

~ podman|docker ps
CONTAINER ID IMAGE COMMAND CREATED STATUS PORTS NAMES
03d9355e1878 nginx:alpine "/docker-entrypoint.…" 5 seconds ago Up 3 seconds 0.0.0.0:8080->80/tcp, :::8080->80/tcp heuristic_merkle

~ curl localhost:8080
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
<style>
body {
width: 35em;
margin: 0 auto;
font-family: Tahoma, Verdana, Arial, sans-serif;
}
</style>
</head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed and
working. Further configuration is required.</p>
<p>For online documentation and support please refer to
<a href="http://nginx.org/">nginx.org</a>.<br/>
Commercial support is available at
<a href="http://nginx.com/">nginx.com</a>.</p>
<p><em>Thank you for using nginx.</em></p>
</body>
</html>
```

## Installiertes Kubectl

Mit dem Client CLI-Tool kubectl werden Kubernetes Cluster gesteuert. Hierbei ist es erforderlich,
dass mindestens die Version 1.21.x vorhanden ist. Ältere Versionen können mit einem aktuellen
Cluster sowie den bereitgestellten Demo-Files nicht mehr korrekt verwendet werden.

Installation: <https://kubernetes.io/de/docs/tasks/tools/install-kubectl/>

### Optional

Neben der eigentlichen Installation bietet es sich an, auch die sogenannte Autocompletion für
Befehle und individuelle Ressourcennamen zu konfigurieren. Die Anleitung dazu ist unter
<https://kubernetes.io/de/docs/tasks/tools/install-kubectl/#aktivieren-der-automatischen-autovervollständigung-der-shell>
zu finden.

Funktionsprüfung kubectl (Client):

```text
~ kubectl version --short --client
Client Version: v1.24.0
```

## Installiertes Kind

KIND (Kubernetes in Docker) wird verwendet, um ein lokales Kubernetes Cluster auf dem Rechner der
Teilnehmer innerhalb eines Containers einzurichten. Die erforderliche Konfiguration dazu lässt
sich mit folgendem Befehl klonen.

Erforderliche Konfiguration:

```bash
git clone https://git.cloudpirates.io/kind-cluster.git
```

Nach der Installation von KIND kann mit folgendem Befehl ein Cluster erstellt werden:

```text
~/Schulungen/kind kind create cluster --config=cluster.yaml
Creating cluster "kind" ...
✓ Ensuring node image (kindest/node:v1.23.5) 🖼
✓ Preparing nodes 📦
✓ Writing configuration 📜
✓ Starting control-plane 🕹
✓ Installing CNI 🔌
✓ Installing StorageClass 💾
Set kubectl context to "kind-kind"
You can now use your cluster with:
kubectl cluster-info --context kind-kind
Not sure what to do next? 😅 Check out https://kind.sigs.k8s.io/docs/user/quick-start/
```

Grundlegende Funktionsprüfung:

```text
~ kubectl version --short
Client Version: v1.23.5
Server Version: v1.23.5

~ kubectl get po -A
NAMESPACE NAME READY STATUS RESTARTS AGE
kube-system coredns-558bd4d5db-8v9rq 1/1 Running 0 3m20s
kube-system coredns-558bd4d5db-qtp9j 1/1 Running 0 3m20s
kube-system etcd-kind-control-plane 1/1 Running 0 3m25s
kube-system kindnet-gjf2j 1/1 Running 0 3m20s
kube-system kube-apiserver-kind-control-plane 1/1 Running 0 3m25s
kube-system kube-controller-manager-kind-control-plane 1/1 Running 0 3m25s
kube-system kube-proxy-k4ps7 1/1 Running 0 3m20s
kube-system kube-scheduler-kind-control-plane 1/1 Running 0 3m25s
local-path-storage local-path-provisioner-547f784dff-j4xwt 1/1 Running 0 3m20s
```

Testen der Erstellung neuer Pods:

```text
~ kubectl create deployment nginx --image=nginx
deployment.apps/nginx created

~ kubectl get pods
NAME READY STATUS RESTARTS AGE
nginx-6799fc88d8-zdgnz 0/1 ContainerCreating 0 6s

~ kubectl get pods
NAME READY STATUS RESTARTS AGE
nginx-6799fc88d8-zdgnz 1/1 Running 0 22s
```

Testen des Networkings (Pod -> Internet). Achtung: Der Name des Pods könnte anders lauten. Dies
kann mit kubectl get pods zuvor geprüft werden:

```text
~ kubectl exec -ti nginx-xxxxxxxxxx-xxxxx -- bash
root@nginx-xxxxxxxxxx-xxxxx:/# curl google.de
<HTML><HEAD><meta http-equiv="content-type" content="text/html;charset=utf-8">
<TITLE>301 Moved</TITLE></HEAD><BODY>
<H1>301 Moved</H1>
The document has moved
<A HREF="http://www.google.de/">here</A>.
</BODY></HTML>
```

Testen des Networking (Pod -> Local) über ein Port Forward sowie einen Aufruf über curl in einem
weiteren Terminal:

```text
~ kubectl port-forward nginx-xxxxxxxxxx-xxxxx 8085:80
Forwarding from 127.0.0.1:8085 -> 80
Forwarding from [::1]:8085 -> 80
```

Neues Terminal:

```text
~ curl localhost:8085
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
</head>
<body>
<h1>Welcome to nginx!</h1>
[ . . . ]
</html>
```
