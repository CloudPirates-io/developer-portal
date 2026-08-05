# Requirements for Participation in Our Kubernetes Training Courses

During the training sessions, many practical exercises are carried out to deepen the theoretical
knowledge. This results in the following requirements for the training participants:

## Access to Demo Files

The source code for all exercises is hosted on our own Soft Serve git server. Access it over SSH:

```bash
ssh git.cloudpirates.io
```

This opens an interactive terminal interface where the available repositories can be browsed, file
contents viewed, and the `git clone` command copied for the repository needed, for example:

```bash
git clone https://git.cloudpirates.io/kind-cluster.git
```

## Container Runtime: Installed Docker Desktop OR Podman

On the one hand, the exercises for containers are carried out via the Container Runtime, and on the
other hand, this is required as a basis for KIND (Kubernetes in Docker). Due to the new licensing
model of Docker Desktop, we like to use Podman as an alternative. Both tools function exactly
identically in terms of operation.

Installation Podman: <https://podman.io/getting-started/>

Installation Docker Desktop: <https://www.docker.com/products/docker-desktop>

Depending on the container runtime used, a function check can be carried out via Docker (e.g.
docker ps) or Podman (e.g. podman ps) as follows:

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
03d9355e1878 nginx:alpine "/docker-entrypoint...." 5 seconds ago Up 3 seconds 0.0.0.0:8080->80/tcp, :::8080->80/tcp heuristic_merkle
~ curl localhost:8080
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!< /title>
<style>
body {
width: 35em;
margin: 0 auto;
font-family: Tahoma, Verdana, Arial, sans-serif;
}
</style>
</head>
<body>
<h1>Welcome to nginx!< /h1>
<p>If you see this page, the nginx web server is successfully installed and
working. Further configuration is required.< /p>
<p>For online documentation and support please refer to
<a href="http://nginx.org/">nginx.org</a>.< br/>
Commercial support is available at
<a href="http://nginx.com/">nginx.com</a>.< /p>
<p><em>Thank you for using nginx.< /em></p>
</body>
</html>
```

## Installed Kubectl

The client CLI tool kubectl is used to control Kubernetes clusters. It is necessary that at least
version 1.21.x is available. Older versions can no longer be used correctly with a current cluster
and the demo files provided.

Installation: <https://kubernetes.io/docs/tasks/tools/#kubectl>

### Optional

In addition to the actual installation, it is also advisable to configure the kubectl
autocompletion for commands and individual resource names. The instructions for this can be found
at <https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/#enable-kubectl-autocompletion>

Function test kubectl (client):

```text
~ kubectl version --short --client
Client Version: v1.24.0
```

## Installed KIND

KIND (Kubernetes in Docker) is used to set up a local Kubernetes cluster on the participants'
computer within a container. The required configuration for this can be cloned with the following
command.

Required configuration:

```bash
git clone https://git.cloudpirates.io/kind-cluster.git
```

After installing KIND, a cluster can be created with the following command:

```text
~/training/kind kind create cluster --config=cluster.yaml
Creating cluster "kind" ...
✓ Ensuring node image (kindest/node:v1.24.0) 🖼
✓ Preparing nodes 📦
✓ Writing configuration 📜
✓ Starting control-plane 🕹
✓ Installing CNI 🔌
✓ Installing StorageClass 💾
Set kubectl context to "kind-kind".
You can now use your cluster with:
kubectl cluster-info --context child-child
Not sure what to do next? 😅 Check out https://kind.sigs.k8s.io/docs/user/quick-start/
```

Basic function test:

```text
~ kubectl version --short
Client Version: v1.24.0
Server Version: v1.24.0
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

Testing the creation of new pods:

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

Testing the networking (Pod -> Internet). Attention: The name of the pod could be different. This
can be checked beforehand with kubectl get pods:

```text
~ kubectl exec -ti nginx-xxxxxxxx-xxxxx -- bash
root@nginx-xxxxxxxx-xxxxx:/# curl google.de
<HTML><HEAD><meta http-equiv="content-type" content="text/html;charset=utf-8">
<TITLE>301 Moved</TITLE></HEAD><BODY>
<H1>301 Moved</H1>
The document has moved
<A HREF="http://www.google.de/">here</A>.
</BODY></HTML>
```

Test the networking (Pod -> Local) via a port forward and a call via curl in another terminal:

```text
~ kubectl port-forward nginx-xxxxxxxx-xxxxx 8085:80
Forwarding from 127.0.0.1:8085 -> 80
Forwarding from [::1]:8085 -> 80
```

New terminal:

```text
~ curl localhost:8085
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!< /title>
</head>
<body>
<h1>Welcome to nginx!< /h1>
[ . . . ]
</html>
```
