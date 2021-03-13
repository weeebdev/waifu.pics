# Simple server for getting random images from [waifu.pics](https://waifu.pics/)

![](https://waifu.now.sh/sfw/random)

Simple API wrapped around @Waifu-pics in order to be able to get random anime images for my markdown profile

- [Simple server for redirecting to the images on waifu.pics](#simple-server-for-redirecting-to-the-images-on-waifupics)
  - [API](#api)
  - [How to get an image](#how-to-get-an-image)
  - [How to use an image in Markdown](#how-to-use-an-image-in-markdown)

## API

Here are different endpoints for API requests. Endpoints can be updated by the author, so, please, check [official docs](https://waifu.pics/docs).

```javascript
{
  sfw: [
    "waifu",
    "neko",
    "shinobu",
    "bully",
    "cry",
    "hug",
    "kiss",
    "lick",
    "pat",
    "smug",
    "highfive",
    "nom",
    "bite",
    "slap",
    "wink",
    "poke",
    "dance",
    "cringe",
    "blush",
    "random"
  ],
  nsfw: ["waifu", "neko", "trap", "blowjob","random"],
}
```

Live:  
![](https://shot-my-url.herokuapp.com/?url=https://waifu.pics/api/endpoints)

## How to get an image

| URL                                  | Request Type |
| ------------------------------------ | ------------ |
| `https://waifu.now.sh/type/endpoint` | **GET**      |

![](https://waifu.now.sh/sfw/kiss)

## How to use an image in Markdown

Just put the above url in typical Markdown syntax

```markdown
![](https://waifu.now.sh/type/endpoint)
```
