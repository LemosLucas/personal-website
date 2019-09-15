# Useful Jekyll commands

# Prefix all jekyll comands with `bundle exec`

This restricts your Ruby environment to only use gems set in your Gemfile, maintaining the proper versions and avoinding issues with updates

Example:
```bash
bundle exec jekyll serve --port 3000 --livereload
```

# Environments
It is possible to only output something in **production** or **development**. To do so, its needed to use the `JEKYLL_ENV` variable. By default, it is development. 

Example:

```bash
JEKYLL_ENV=production bundle exec jekyll build
```

Also, this variable is accessible in liquid by using `jekyll.environment`.
Example:
```jekyll
{% if jekyll.environment == "production" %}
  <script src="my-analytics-script.js"></script>
{% endif %}
```

# Deployment
The basic way is to perform a production build and take the contents of the `_site` folder and deploy to your server. Example:

```bash
JEKYLL_ENV=production bundle exec jekyll build
```

However, you can automate this tasks by using, for example, Circle CI