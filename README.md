# music converter

## Getting Started

```shell
$ docker-compose up -d app
# go to localhost:1445
```

or

```shell
$ sh cli/convert.sh
```

Which is simpler and faster, because we aren't waiting for http requests, and it
saves the files to the songs directory
