// Plant.id API Integration
class PlantIdAPI {
    constructor() {
        // You'll need to get a free API key from https://web.plant.id/api-access-request/
        this.apiKey = 'YOUR_PLANT_ID_API_KEY'; // Replace with your actual API key
        this.baseUrl = 'https://api.plant.id/v2';
    }

    // Set API key (should be called after user provides their key)
    setApiKey(apiKey) {
        this.apiKey = apiKey;
        localStorage.setItem('plantIdApiKey', apiKey);
    }

    // Get stored API key
    getApiKey() {
        if (!this.apiKey || this.apiKey === 'YOUR_PLANT_ID_API_KEY') {
            this.apiKey = localStorage.getItem('plantIdApiKey');
        }
        return this.apiKey;
    }

    // Identify plant from image
    async identifyPlant(imageFile) {
        const apiKey = this.getApiKey();
        
        if (!apiKey || apiKey === 'YOUR_PLANT_ID_API_KEY') {
            throw new Error('Plant.id API key not configured. Please add your API key in the settings.');
        }

        try {
            // Convert image to base64
            const base64Image = await this.fileToBase64(imageFile);
            
            // Prepare request data
            const requestData = {
                images: [base64Image],
                plant_details: ['common_names', 'url', 'wiki_description', 'taxonomy'],
                health: 'all'
            };

            // Make API request
            const response = await fetch(`${this.baseUrl}/identify`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Api-Key': apiKey
                },
                body: JSON.stringify(requestData)
            });

            if (!response.ok) {
                throw new Error(`API request failed: ${response.status} ${response.statusText}`);
            }

            const result = await response.json();
            return this.processIdentificationResult(result);
            
        } catch (error) {
            console.error('Plant identification error:', error);
            throw error;
        }
    }

    // Convert file to base64
    fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                // Remove data:image/jpeg;base64, prefix
                const base64 = reader.result.split(',')[1];
                resolve(base64);
            };
            reader.onerror = error => reject(error);
        });
    }

    // Process API response
    processIdentificationResult(result) {
        if (!result.suggestions || result.suggestions.length === 0) {
            throw new Error('No plants identified in the image');
        }

        const suggestions = result.suggestions.map(suggestion => ({
            name: suggestion.plant_name,
            scientificName: suggestion.plant_details?.scientific_name || suggestion.plant_name,
            confidence: suggestion.probability,
            description: suggestion.plant_details?.wiki_description?.value || '',
            commonNames: suggestion.plant_details?.common_names || [],
            url: suggestion.plant_details?.url || '',
            taxonomy: suggestion.plant_details?.taxonomy || {},
            health: suggestion.health || null
        }));

        return {
            suggestions: suggestions,
            health: result.health,
            isPlant: result.is_plant?.probability > 0.5
        };
    }

    // Get plant details by name
    async getPlantDetails(plantName) {
        const apiKey = this.getApiKey();
        
        if (!apiKey || apiKey === 'YOUR_PLANT_ID_API_KEY') {
            throw new Error('Plant.id API key not configured');
        }

        try {
            const response = await fetch(`${this.baseUrl}/plants/${encodeURIComponent(plantName)}`, {
                headers: {
                    'Api-Key': apiKey
                }
            });

            if (!response.ok) {
                throw new Error(`API request failed: ${response.status}`);
            }

            return await response.json();
            
        } catch (error) {
            console.error('Plant details error:', error);
            throw error;
        }
    }

    // Check if API key is valid
    async validateApiKey(apiKey) {
        try {
            const response = await fetch(`${this.baseUrl}/usage_info`, {
                headers: {
                    'Api-Key': apiKey
                }
            });
            
            return response.ok;
        } catch (error) {
            return false;
        }
    }

    // Get usage information
    async getUsageInfo() {
        const apiKey = this.getApiKey();
        
        if (!apiKey || apiKey === 'YOUR_PLANT_ID_API_KEY') {
            return null;
        }

        try {
            const response = await fetch(`${this.baseUrl}/usage_info`, {
                headers: {
                    'Api-Key': apiKey
                }
            });

            if (response.ok) {
                return await response.json();
            }
            
            return null;
        } catch (error) {
            console.error('Usage info error:', error);
            return null;
        }
    }
}

// Export for use in other modules
window.PlantIdAPI = PlantIdAPI; 