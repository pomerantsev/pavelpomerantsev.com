# pavelpomerantsev.com (personal website)


## Table of contents

* [Guiding principles](#guiding-principles)
* [Domain name](#domain-name)
* [User experience design](#user-experience-design)
  * [Textual content / HTML](#textual-content--html)
  * [Styling / CSS](#styling--css)
  * [Images](#images)
  * [Behavior / JavaScript](#behavior--javascript)
  * [Favicons](#favicons)
* [SEO (search engine optimization)](#seo-search-engine-optimization)
* [Security](#security)
* [Development](#development)
  * [File organization](#file-organization)
  * [Build process and previewing](#build-process-and-previewing)
  * [Code versioning and hosting](#code-versioning-and-hosting)
  * [Website hosting and deployment](#website-hosting-and-deployment)
* [Testing](#testing)
  * [Basic usability testing](#basic-usability-testing)
  * [Performance and accessibility testing](#performance-and-accessibility-testing)
  * [SEO testing](#seo-testing)


## Guiding principles

I’m planning the website to stay online as long as I’m online and active,
and I want its design to represent my ideals,
so it has to have certain user-facing qualities.

* Aesthetically simple.
* Performant and reliable.
* Inclusive of a wide array of user needs and preferences
  (what’s collectively considered to be the accessibility domain).
* It should rely only on web standards,
  to ensure it can be viewed even if I don’t touch it in years.

Developer experience is of utmost importance as well.

* The site has to be simple to develop and maintain.
  Build tooling should be kept to a minimum,
  and it should depend on as few third-party libraries as possible.
* I should have full control over the frontend (for now).
  I’m confident in my frontend skills,
  and I know I’m able to do a great job here.
* I should minimize backend complexity and preferably
  delegate backend and devops to a third-party provider.
* The project should have good up-to-date documentation.


## Domain name

The content’s primary location is
[www.pavelpomerantsev.com](https://www.pavelpomerantsev.com).
The reason to have www as a primary domain
(as opposed to the second-level pavelpomerantsev.com domain)
was the [recommendation from Netlify](https://www.netlify.com/blog/2020/03/26/how-to-set-up-netlify-dns-custom-domains-cname-a-records/)
(that I use for hosting).

The domain is currently managed by [Godaddy](https://www.godaddy.com/).
I don’t have a domain registrar preference,
but I’ve historically had Godaddy manage all my .com domains.


## User experience design

### Textual content / HTML

The only thing worth mentioning about text is that
[the right typographical symbols (such as curved apostrophes instead of straight ones) are inserted by hand](https://www.webnots.com/option-or-alt-key-shortcuts-to-insert-symbols-in-mac-os-x/).

Content structure is conveyed through HTML.
Correct usage of heading elements or lists ensures
that the structure is conveyed even if default browser styles are used,
or in [reader mode](https://support.apple.com/guide/safari/hide-ads-when-reading-articles-sfri32632/mac).
It also ensures that it’s easier to navigate content
for users of screen readers or voice input who rely on semantics.


### Styling / CSS

The main guiding principle for CSS
is to make it compact but easily understandable,
while trying to cover various viewport sizes and preferences.
Some modern CSS capabilities are used (but not cutting-edge!)
which may not be supported in older browsers.
However, CSS is only used to enhance presentation,
so even if some properties and values are not supported,
all content should still be perceivable,
and no functionality should be lost.



* Text appearance
  * I’ve shamelessly stolen most of the font properties
    (such as font families, sizes, line heights, paragraph spacing, and content width)
    from [Andy Bell’s article on content readability](https://piccalil.li/tutorial/improve-the-readability-of-the-content-on-your-website/).
    It looks great, and I’m not sure I can come up with a good visual design system myself.
  * The [modular scale](https://every-layout.dev/rudiments/modular-scale/)
    used for defining font sizes is slightly different than in the above post.
  * [`px` values are not used for font sizes or line spacings](https://www.24a11y.com/2019/pixels-vs-relative-units-in-css-why-its-still-a-big-deal/).
    They actually aren’t used for any font-related properties at all
    (including line length) to ensure visual consistency
    for cases when users override the default browser font size.
* Colors
  * I support separate color schemes for light and dark modes through a media query.
    To reduce maintenance burden,
    I simply redefine some CSS custom properties for the dark mode,
    and I use the custom properties for all content and background colors.
  * I’ve borrowed color constants from somewhere,
    and I’ve ensured that certain color combinations have enough contrast against each other,
    both in light and dark modes
    (a [contrast checker](https://webaim.org/resources/contrastchecker/) can be used for that,
    or Chrome dev tools).
    The contrast should preferably be significantly higher than the threshold
    (as it is now) to ensure great readability.
    * Text color against background: 4.5:1
      ([WCAG 1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)).
    * Link color against background: 4.5:1.
    * Selected text and links against selection background (same ratio).
    * Link color doesn’t have to contrast with text color since links are distinguished by underlines anyway.
* On hover
  * I use an underline thickness change on hover,
    to ensure that the change is noticeable but not too distracting.
* On focus
  * The focus indicator is a simple outline.
    It’s a couple lines of CSS,
    it meets the draft [WCAG 2.4.11 Focus Appearance](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance-minimum.html) criterion,
    and it means that we don’t need any special styles
    for the [forced-colors mode](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors)
    since outlines are visible there by default.


### Images

Images are a special kind of content where HTML and CSS sometimes have to be considered in tandem.

To ensure that content images look good and are loaded in a performant way,
I’m generally following the guidance from [Image Optimization by Addy Osmani](https://www.smashingmagazine.com/printed-books/image-optimization/).

**Note:** I only have one image at the moment,
so if I have more, some of the below may change.

* Size.
  * Content images have a width and a height set in HTML.
    That way, the width / height ratio is known before the image itself
    is loaded so the browser reserves space for it without CSS tricks
    and prevents [layout shifts](https://web.dev/cls/).
    It also helps ensure that if CSS is not loaded,
    the image still has a sensible size.
  * The hero image has to be not too tall
    (so text content is seen above the fold on laptop and desktop screens),
    hence the width of the image is capped
    (depending on viewport width, it may be less than 100% of text-content width).
* Resolution.
  * I use [responsive images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
    (specifically the `srcset` and `sizes` attributes in HTML),
    which is especially important for any larger images.
    * This requires me to maintain sizes both in CSS and in HTML.
      Unfortunately, it’s done manually at the moment.
    * The set of image sizes has been selected quite randomly.
      I probably chose reasonable minimum and maximum sizes,
      based approximately on what size the image can have in CSS pixels,
      and generated all in-between sizes, with a reasonable step.
      I may have overengineered this.
      If I have to add more images in the future,
      and the approach turns out to be unwieldy,
      I may think of something else.
    * Values in the sizes attribute are approximate,
      but they have been calculated through actual breakpoints
      (at what viewport width content width changes),
      and then divided by 16 (value of 1 rem on my dev machine).
* Asset optimization
  * To optimize image assets, I've used [squoosh.app](https://squoosh.app/).
    The quality setting on all sizes is 70,
    it seemed to look fine on all resolutions,
    although a better understanding of SSIM (Structural Similarity Index)
    and a comparison of different image qualities before picking one
    would have been beneficial.
* Other visual considerations
  * As an enhancement, the hero image has a background color
    as a simple placeholder while the image is loading.

The photo original for the hero image can be found
in [Google Drive](https://drive.google.com/drive/folders/1R2q4aonoCpUIoUsHCgN6aKqODDFW6wQ5?usp=sharing).


### Behavior / JavaScript

I haven’t felt the need to add any scripted behaviors to the site.
If I do it in the future,
I should treat JavaScript as an enhancement rather than as a dependency because
[in some cases JS still doesn’t run](https://gds.blog.gov.uk/2013/10/21/how-many-people-are-missing-out-on-javascript-enhancement/).


### Favicons

~~I’ve used [an article on favicons by Andrey Sitnik](https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs)
to make decisions here.~~
I ended up doing the following.

* 16px, 32px, and 48px icons are included as `<link rel="icon">` in HTML `<head>`.
* ~~A separate `<link rel="apple-touch-icon">` is included there as well.
  I’m unsure why Andrey recommended to add padding around a 140px icon to make it 180px.~~
  * ~~To add the padding,
    I [used Imagemagick](https://stackoverflow.com/questions/1787356/use-imagemagick-to-place-an-image-inside-a-larger-canvas).~~
* ~~192px and 512px icons are referenced in manifest.json
  (in turn referenced in `<head>`).
  It’s supposedly for Android, but I haven’t tested these icons yet.~~
* I eventually got rid of all non-standard icons (web-manifest and Apple ones).
  I don’t think I need the website to be installable,
  so the maintenance cost doesn’t seem to be worth it.

The photo original for the favicons can be found
in [Google Drive](https://drive.google.com/drive/folders/1R2q4aonoCpUIoUsHCgN6aKqODDFW6wQ5?usp=sharing).


## SEO (search engine optimization)

A simple robots.txt file has been added to allow all user agents to access all content.
Nothing else has been done specifically for SEO.


## Security

The site does not have user-generated content,
so there may be no vulnerabilities to exploit through the web interface,
however [WebPageTest](https://www.webpagetest.org/) suggested some sensible headers
to be included in the responses,
so those are all specified in /public/_headers,
per [Netlify’s custom headers docs](https://docs.netlify.com/routing/headers/).


## Development

### File organization

All I have code for now is public assets (the /public folder).
HTML files are the only ones that require a build step,
so the source for those lives in /src.
CSS, images, favicons, and the rest don’t involve a build step,
so their source is in /public.

I use [nunjucks](https://mozilla.github.io/nunjucks/) as a template compiler.
There has been no big reason to choose this templating language / compiler
over other solutions other than its popularity and docs quality.

Even though my site has only one content page at the moment,
I’ve still had to introduce a build step for HTML,
and to add a third-party dependency.
I’ve done it since I want to have a custom 404 page as well
(not a default Netlify one),
and I don’t want duplicate header contents in the source.

**Note:** to make it potentially simpler to introduce a directory hierarchy for HTML files in the future,
I make sure that paths for all resources are absolute (`/path/to/file`),
not relative (`path/to/file`).


### Build process and previewing

HTML files are built with `npm run build`.
It calls a simple scripts/renderTemplates.js script
that in turn calls nunjucks to build the HTML.
For the sake of simplicity,
I don’t have any directory watching or hot reloading,
so the script has to be run manually on each HTML change.

As of now, if additional HTML files are introduced,
they need to be manually added to the build script.

To preview the results, I use http-server.
It’s started with `npm run start`,
a script that should run in a separate terminal window.
The website is then available at [http://localhost:8080](http://localhost:8080).


### Code versioning and hosting

Code is versioned using [git](https://git-scm.com/)
and [hosted on Github](https://github.com/pomerantsev/pavelpomerantsev.com).


### Website hosting and deployment

I use Netlify for hosting and deployment:
[https://app.netlify.com/sites/pavelpomerantsev](https://app.netlify.com/sites/pavelpomerantsev).
The Netlify app is connected to the Github repo,
and it builds and deploys on every commit on the `master` branch.

As with the other third-party dependencies in this project,
I’ve chosen it because it’s popular and it seems to solve all my needs:
static asset hosting, easy deployment, SSL / TLS.
It’s great to be able to update the live website with a simple `git push` command.
And I’m able to use the free tier for now.

To ensure that the assets are [built by Netlify](https://docs.netlify.com/configure-builds/manage-dependencies/),
the project has package.json and .node-version files.
Also, since the build tools are listed under `devDependencies` in package.json,
[`NODE_ENV` is set to `development` on Netlify](https://docs.netlify.com/configure-builds/manage-dependencies/#node-js-environment).


## Testing

All testing is manual at the moment.


### Basic usability testing

I test the following without any external tools.

* Content looks good on wide and narrow viewports.
* Colors have good contrast in light and dark modes
  (actually, this can be verified with Chrome dev tools).
* Links have good hover styles.
* All interactive elements (currently on links) have highly visible keyboard styles.


### Performance and accessibility testing

I regularly run the following tools.



* [axe Chrome extension](https://chrome.google.com/webstore/detail/axe-devtools-web-accessib/lhdoppojpmngadmnindnejefpokejbdd?hl=en-US)
  (it’s the accessibility testing tool that I’m most familiar with).
* Lighthouse in Chrome dev tools.
  I mostly run it locally, but it may be good to also run
  [the online version of it](https://web.dev/measure/).
  All scores are currently within the 90–100 range, which is probably fine.


### SEO testing

In addition to Lighthouse SEO testing,
I make sure in Google Search Console
that the [www page is on Google](https://search.google.com/search-console/inspect?resource_id=sc-domain%3Apavelpomerantsev.com&id=uB9KKTrxw9BSC0wr6FEkhw).
But it’s possible that now that it has been picked up,
I don’t need to do anything going forward.
