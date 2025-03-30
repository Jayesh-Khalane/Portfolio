// Initialize an array for counting from 1 to 100
const countsArray = Array.from({ length: 100 }, (_, i) => i + 1);

// Initialize localStorage if not exists
function initializeCounters(blogId) {
    if (!localStorage.getItem(`${blogId}_likeIndex`)) {
        localStorage.setItem(`${blogId}_likeIndex`, '0');
    }
    if (!localStorage.getItem(`${blogId}_shareIndex`)) {
        localStorage.setItem(`${blogId}_shareIndex`, '0');
    }
}

// Update display with current count
function updateDisplay(blogId) {
    const likeIndex = parseInt(localStorage.getItem(`${blogId}_likeIndex`));
    const shareIndex = parseInt(localStorage.getItem(`${blogId}_shareIndex`));
    
    const likeCount = document.getElementById('likeCount');
    const shareCount = document.getElementById('shareCount');
    
    if (likeCount) {
        likeCount.textContent = likeIndex >= 99 ? '100+' : countsArray[likeIndex];
    }
    if (shareCount) {
        shareCount.textContent = shareIndex >= 99 ? '100+' : countsArray[shareIndex];
    }
}

// Handle like button click
function handleLike(blogId) {
    let currentIndex = parseInt(localStorage.getItem(`${blogId}_likeIndex`));
    if (currentIndex < 99) {
        currentIndex++;
        localStorage.setItem(`${blogId}_likeIndex`, currentIndex.toString());
    }
    updateDisplay(blogId);
    
    // Add animation effect
    const likeBtn = document.getElementById('likeButton');
    likeBtn.classList.add('liked');
    setTimeout(() => likeBtn.classList.remove('liked'), 1000);
}

// Handle share button click
function handleShare(blogId) {
    let currentIndex = parseInt(localStorage.getItem(`${blogId}_shareIndex`));
    if (currentIndex < 99) {
        currentIndex++;
        localStorage.setItem(`${blogId}_shareIndex`, currentIndex.toString());
    }
    
    // Handle share functionality
    if (navigator.share) {
        navigator.share({
            title: document.title,
            url: window.location.href
        });
    } else {
        navigator.clipboard.writeText(window.location.href)
            .then(() => alert('Link copied to clipboard!'));
    }
    
    updateDisplay(blogId);
}

// Reset counts (admin function)
function resetCounts(blogId, type, value = 0) {
    if (type === 'likes' || type === 'all') {
        localStorage.setItem(`${blogId}_likeIndex`, value.toString());
    }
    if (type === 'shares' || type === 'all') {
        localStorage.setItem(`${blogId}_shareIndex`, value.toString());
    }
    updateDisplay(blogId);
    console.log(`Reset ${blogId} ${type} to ${value}`);
}

// Export for use in global context
window.initializeCounters = initializeCounters;
window.updateDisplay = updateDisplay;
window.handleLike = handleLike;
window.handleShare = handleShare;
window.resetCounts = resetCounts; 