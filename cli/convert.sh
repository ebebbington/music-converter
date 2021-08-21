read -p 'URL: ' url
docker exec cli deno run -A convert.ts $url && mv cli/songs/* 'D:/Music/Song with Increase Vol/'