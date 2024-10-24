# Notes

[**A blog for the detailed walkthrough of this project**](https://dev.to/themodernweb/create-working-youtube-clone-with-search-box-youtube-api-2a6e)

[This is a replica of Youtube Homepage clone](https://www.codingnepalweb.com/build-youtube-homepage-clone-html-css/)

```javascript
/* Example code for setting up API requests using JavaScript's fetch() method to pull data, and dynamically rendering video content using HTML templates. */
let api_key = "your api key";
let video_http = "https://www.googleapis.com/youtube/v3/videos?";

fetch(video_http + new URLSearchParams({
    key: api_key,
    part: 'snippet',
    chart: 'mostPopular',
    maxResults: 50,
    regionCode: 'IN'
}))
.then(res => res.json())
.then(data => {
    data.items.forEach(item => {
        // Code to display video cards
    });
})
.catch(err => console.log(err));

```
