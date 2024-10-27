# Other unused features

```javascript
// Loose search implementation
const searchLink = "https://www.youtube.com/results?search_query=";
searchBtn.addEventListener('click', () => {
    if (searchInput.value.length) {
        location.href = searchLink + searchInput.value;
    }
})
