const logout = async () => {
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      session.location.replace('/');
    } else {
      alert('Failed to log out');
    }
};
document.querySelector('#logout').addEventListener('click', logout);

window.addEventListener('beforeunload', async (event) => {
  if (!isInternalUrl(event.currentTarget.location.href, event.currentTarget.document.referrer)) {

  try {
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })

    if (!response.ok) {
      console.log('Failed to logout');
    }
  } catch (err) {
    console.error('Error logging out:', error);
  }
  }
})

// Function to check if a URL is internal (part of the same website)
function isInternalUrl(currentUrl, referrerUrl) {
  const currentDomain = getDomain(currentUrl);
  const referrerDomain = getDomain(referrerUrl);
  return currentDomain === referrerDomain;
}

// Function to extract the domain from a URL
function getDomain(url) {
  return new URL(url).hostname;
}