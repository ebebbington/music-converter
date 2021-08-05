# todo prompt for urls here
read -p 'URLs: ' urls
docker-compose up -d cli
# todo then pass urls to script, which script will get from args
docker exec cli deno run -A convert.ts $urls
mv cli/songs/* 'D:/Music/Song with Increase Vol/'