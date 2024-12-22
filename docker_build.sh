if [ -z "$1" ]; then
  echo "Docker tag version is empty. Usage \`$0 <version>\`"
  exit 1
fi

VERSION=$1
GTIHUB_USER=jekys13
REPO_NAME=tg-memebership-api
REGISTRY=ghcr.io
FULL_IMAGE_TAG=$REGISTRY/$GTIHUB_USER/$REPO_NAME:$VERSION

echo "Building image $FULL_IMAGE_TAG"
docker build ./ -t $FULL_IMAGE_TAG

read -p "Do you want to push the image to GitHub Container Registry? (yes/no): " PUSH_CHOICE

if [[ "$PUSH_CHOICE" == "yes" ]]; then
  echo "Pushing image $FULL_IMAGE_TAG"
  docker push $FULL_IMAGE_TAG
else
  echo "Skipping push"
fi