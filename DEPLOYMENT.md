# Hostinger Docker Manager Deployment

This project uses the same no-SSH Hostinger Docker Manager deployment style as `hrms-payroll`.

GitHub Actions calls Hostinger's Docker API. Hostinger builds the Docker Compose project from this GitHub repository.

## Branches

- Push to `stage` deploys `staging.ingversionsdigital.com`
- Push to `production` deploys `ingversionsdigital.com` and `www.ingversionsdigital.com`

## GitHub Settings

Repository secrets:

```txt
HOSTINGER_API_KEY
HOSTINGER_PERSONAL_ACCESS_TOKEN
```

Repository variable:

```txt
HOSTINGER_VM_ID
```

The current workflow uses `HOSTINGER_API_KEY` and `HOSTINGER_VM_ID` directly. `HOSTINGER_PERSONAL_ACCESS_TOKEN` may still be needed by Hostinger for private repo access, matching the existing HRMS setup.

## Docker Projects

Production:

```txt
project: ingversionsdigital-live
compose: docker-compose.production.yml
direct test: http://72.62.226.183:8090
```

Staging:

```txt
project: ingversionsdigital-live-stage
compose: docker-compose.stage.yml
direct test: http://72.62.226.183:8091
```

## Cloudflare DNS

```txt
A      ingversionsdigital.com          72.62.226.183           Proxied
A      staging                         72.62.226.183           Proxied
CNAME  www                             ingversionsdigital.com  Proxied
```

Remove the old website records:

```txt
A      ingversionsdigital.com          86.38.243.134
AAAA   ingversionsdigital.com          2a02:4780:11:1434:0:2fdc:424c:2
```

Only add an `AAAA` record if the new VPS has an IPv6 address.

## VPS Logs

Staging:

```bash
cat /docker/ingversionsdigital-live-stage/.build.log
docker ps -a --filter name=ingversionsdigital-live-stage
```

Production:

```bash
cat /docker/ingversionsdigital-live/.build.log
docker ps -a --filter name=ingversionsdigital-live-production
```
