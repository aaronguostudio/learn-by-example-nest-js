# Learn by Example: nestjs

## Notes

### Docker

`docker-compose up -d`

### TypeORM Migration

`npx typeorm migration:create src/migrations/<name>`
`npx typeorm migration:run -d dist/typeorm-cli.config`
`npx typeorm migration:revert -d dist/typeorm-cli.config`
`npx typeorm migration:generate src/migrations/<name> -d dist/typeorm-cli.config`