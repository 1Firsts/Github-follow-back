// Content script (runs on github.com)

// Listen for changes in the "followers" count element
const followersCountElement = document.querySelector('[data-hovercard-type="followers"]');
if (followersCountElement) {
  const observer = new MutationObserver(() => {
    followBackNewFollowers();
  });
  observer.observe(followersCountElement, { childList: true });
}

// Follow back new followers
function followBackNewFollowers() {
  const followers = Array.from(document.querySelectorAll('.follow-list-name'));
  followers.forEach((follower) => {
    const followerUsername = follower.innerText;
    followUser(followerUsername);
  });
}

// Follow a user
function followUser(username) {
  const endpoint = `https://api.github.com/user/following/${username}`;
  fetch(endpoint, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `token YOUR_ACCESS_TOKEN`,
    },
  })
    .then((response) => {
      if (response.ok) {
        console.log(`Successfully followed ${username}`);
      } else {
        console.error(`Failed to follow ${username}`);
      }
    })
    .catch((error) => {
      console.error(`An error occurred while following ${username}:`, error);
    });
}
