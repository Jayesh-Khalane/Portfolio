class BlogInteractions {
    constructor() {
        this.countsCache = {};
        this.initializeCounters();
    }

    async initializeCounters() {
        try {
            // Fix the path to be relative to the blog post location
            const response = await fetch('../../data/blog-interactions.json');
            this.countsCache = await response.json();
            this.updateAllDisplays();
        } catch (error) {
            console.error('Failed to initialize counters:', error);
            this.countsCache = {};
        }
    }

    updateAllDisplays() {
        Object.keys(this.countsCache).forEach(blogId => {
            this.updateDisplay(blogId, 'likes');
            this.updateDisplay(blogId, 'shares');
        });
    }

    updateDisplay(blogId, type) {
        // Fix: Use the correct ID format
        const element = document.getElementById(`${type}Count`);
        if (element) {
            const count = this.countsCache[blogId]?.[type] || 0;
            element.textContent = count >= 100 ? '100+' : count;
        }
    }

    handleLike(blogId) {
        // Add local storage fallback for testing
        const key = `${blogId}_likes`;
        const currentCount = parseInt(localStorage.getItem(key) || '0');
        const newCount = Math.min(currentCount + 1, 100);
        localStorage.setItem(key, newCount.toString());
        
        // Update display
        const element = document.getElementById('likesCount');
        if (element) {
            element.textContent = newCount >= 100 ? '100+' : newCount;
        }
    }

    handleShare(blogId) {
        // Add local storage fallback for testing
        const key = `${blogId}_shares`;
        const currentCount = parseInt(localStorage.getItem(key) || '0');
        const newCount = Math.min(currentCount + 1, 100);
        localStorage.setItem(key, newCount.toString());
        
        // Update display
        const element = document.getElementById('sharesCount');
        if (element) {
            element.textContent = newCount >= 100 ? '100+' : newCount;
        }
    }
}

// Initialize the interactions system
const blogInteractions = new BlogInteractions();

// Export functions for use in HTML
window.handleLike = (blogId) => blogInteractions.handleLike(blogId);
window.handleShare = (blogId) => blogInteractions.handleShare(blogId); 