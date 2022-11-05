docker build -t pharm-fr .
docker rm -f pharm-fr
docker run -d --name pharm-fr -p8080:80 pharm-fr