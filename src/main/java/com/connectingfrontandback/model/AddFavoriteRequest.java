package com.connectingfrontandback.model;


    public class AddFavoriteRequest {
        private String recipeName;
        private String user;
    
        // Getters and Setters
        public String getRecipeName() {
            return recipeName;
        }
    
        public void setRecipeName(String recipeName) {
            this.recipeName = recipeName;
        }
    
        public String getUser() {
            return user;
        }
    
        public void setUser(String user) {
            this.user = user;
        }
    }
    
