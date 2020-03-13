# VisConf

A web based talk visualiser for the conference/meetup talks. 

VisConf lets you generate an animated version of your talk from your slides and transcript.

![Version badge of the repository](https://img.shields.io/github/package-json/v/saurabhdaware/visconf?style=for-the-badge)

***Example:*** https://visconf.now.sh/saurabhdaware/visconf-intro

![Screenshot of VisConf](https://res.cloudinary.com/saurabhdaware/image/upload/v1580809861/saurabh2019/projects/screenshot.png)

---
## Table of Content
- [How to Create your Visual Talk](#how-to-create-your-visual-talk)
- [Transcript Markdown Guide](#transcript-markdown)

---

## How to Create your Visual Talk
- Convert your .pptx slides to .pdf format
- Upload slides to any of the CDNs or GitHub
- Visit https://visconf.now.sh/create and everything else is as easy as writing a blog!

---

## Transcript Markdown
In transcript you can use characters like `|`, `||` and `$wait5s`.

- Single dash (`|`) will switch the text in bubble.
- Double dash (`||`) changes to next slide. 
- `$wait2s`, `$wait5s`, and `$wait10s` can be used to make a pause while talking for 2sec, 5sec, and 10sec respectively.

Example Transcript:
```md
Hey There!
| I am Saurabh, and today I am super excited to announce VisConf!!

|| A lot of times in meetups, I see talks on some amazing topics
| Sadly small meetups do not have resources to record and publish these talks
| However the world needs to see them $wait2s

|| So randomly I had the idea of creating an animated version of these talks
| VisConf lets you generate an animated version of talk from transcript and slides
| All you have to do is upload transcript and slides.pdf and send Pull Request to main repository

```
---

## Contributing
Checkout [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines

---

I would be super happy to have sponsors for this project! you can Buy me a Coffee or email me at saurabhdaware99@gmail.com
[<img alt="Buy me a Coffee Button" width=200 src="https://cdn.buymeacoffee.com/buttons/default-orange.png">](https://www.buymeacoffee.com/ctd6809)


Thank You 🌻