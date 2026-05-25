# Hostinger Docker Manager Deployment

This project uses the same no-SSH Hostinger Docker Manager deployment style as `hrms-payroll`.

GitHub Actions does not SSH into the VPS. It calls Hostinger's Docker deployment integration, and Hostinger builds the Docker Compose project from this GitHub repository.

Official references:

- Hostinger Docker VPS template: https://support.hostinger.com/en/articles/8306612-how-to-use-the-docker-vps-template
- Hostinger domain to VPS guide: https://support.hostinger.com/en/articles/1583227-how-to-point-a-domain-to-your-vps
- GitHub Actions secrets: https://docs.github.com/actions/how-tos/write-workflows/choose-what-workflows-do/use-secrets
- Cloudflare proxy status: https://developers.cloudflare.com/dns/proxy-status/
- Traefik Docker provider labels: https://doc.traefik.io/traefik/v2.10/providers/docker/

## 1. Deployment Model

- Push to `stage` deploys `staging.ingversionsdigital.com`
- Push to `production` deploys `ingversionsdigital.com` and `www.ingversionsdigital.com`
- Production Docker project name: `ingversionsdigital-live`
- Staging Docker project name: `ingversionsdigital-live-stage`
- Production direct test port: `8090`
- Staging direct test port: `8091`

The Dockerfile builds the Vite site inside Docker, then serves the generated `dist/` through Nginx.

## 2. Required GitHub Secrets And Variables

Use the same Hostinger credentials style used by `hrms-payroll`.

In GitHub, open:

```txt
Repository -> Settings -> Secrets and variables -> Actions
```

Add repository secrets:

```txt
HOSTINGER_API_KEY
HOSTINGER_PERSONAL_ACCESS_TOKEN
```

Add repository variable:

```txt
HOSTINGER_VM_ID
```

You do not need:

```txt
HOSTINGER_SSH_KEY
HOSTINGER_SSH_USER
HOSTINGER_SSH_PORT
```

Those were for the older SSH-based approach and are not used now.

## 3. Where The Hostinger Values Come From

Use the existing values from the working `hrms-payroll` repository if this website deploys to the same Hostinger VPS:

- `HOSTINGER_API_KEY`
- `HOSTINGER_PERSONAL_ACCESS_TOKEN`
- `HOSTINGER_VM_ID`

The personal access token is a GitHub token that lets Hostinger read this repository. If this repository is private, make sure the token has access to `Webteamspz/ingversionsdigital-live`.

## 4. GitHub Workflow

The workflow is:

```txt
.github/workflows/deploy.yml
```

It uses:

```yaml
hostinger/deploy-on-vps@v2
```

Production deploy settings:

```txt
project-name=ingversionsdigital-live
docker-compose-path=docker-compose.production.yml
WEBSITE_DOMAIN=ingversionsdigital.com
WWW_DOMAIN=www.ingversionsdigital.com
WEBSITE_PUBLIC_PORT=8090
```

Staging deploy settings:

```txt
project-name=ingversionsdigital-live-stage
docker-compose-path=docker-compose.stage.yml
WEBSITE_DOMAIN=staging.ingversionsdigital.com
WEBSITE_PUBLIC_PORT=8091
```

## 5. Hostinger Docker Manager

After the first GitHub deployment, Hostinger Docker Manager should show two projects:

```txt
ingversionsdigital-live
ingversionsdigital-live-stage
```

Expected containers:

```txt
ingversionsdigital-live-production
ingversionsdigital-live-stage
```

Direct test URLs:

```txt
http://72.62.226.183:8090
http://72.62.226.183:8091
```

The public domains should route through the existing Hostinger Traefik project:

```txt
https://ingversionsdigital.com
https://www.ingversionsdigital.com
https://staging.ingversionsdigital.com
```

## 6. Cloudflare DNS

Set these website records:

```txt
A      ingversionsdigital.com          72.62.226.183           Proxied
A      staging                         72.62.226.183           Proxied
CNAME  www                             ingversionsdigital.com  Proxied
```

Replace or remove the old website records:

```txt
A      ingversionsdigital.com          86.38.243.134
AAAA   ingversionsdigital.com          2a02:4780:11:1434:0:2fdc:424c:2
```

Only add an `AAAA` record if the new VPS has an IPv6 address.

Do not change mail or verification records during the website migration:

```txt
MX
TXT
CAA
DKIM CNAME records
autodiscover/autoconfig CNAME records
```

For non-HTTP services such as real FTP/SFTP, use DNS-only instead of Cloudflare proxy.

## 7. First Staging Deployment

Push the `stage` branch:

```bash
git checkout stage
git push origin stage
```

Then open:

```txt
GitHub -> Actions -> Deploy to Hostinger VPS
```

Check staging:

```bash
curl -I http://72.62.226.183:8091
curl -I https://staging.ingversionsdigital.com
```

## 8. Production Deployment

After staging is verified:

```bash
git checkout production
git merge stage
git push origin production
```

Check production:

```bash
curl -I http://72.62.226.183:8090
curl -I https://ingversionsdigital.com
curl -I https://www.ingversionsdigital.com
```

## 9. Rollback

Code rollback:

```bash
git revert <bad-commit-sha>
git push origin production
```

DNS rollback during migration:

```txt
A ingversionsdigital.com 86.38.243.134
```

Do not change email records during a website rollback.
