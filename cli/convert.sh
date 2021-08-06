read -p 'URLs: ' urls
docker-compose up -d cli
docker exec cli deno run -A convert.ts $urls && mv cli/songs/* 'D:/Music/Song with Increase Vol/'