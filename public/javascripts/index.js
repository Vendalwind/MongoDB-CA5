/**
 * The Angular controller
 */
angular.module('LearnMongoApp',['ui.router'])
.controller('LearnMongoCtrl', ['$scope', '$http', function($scope, $http) {
        
        /* States */
        
        $scope.states = [];
        
        // Add all the states to it
        var state = {
            codeSnippetStart: "db.createCollection(\"contacts\", ",
            codeSnippet: "\"validator\": {\r\n\t\"$and\": [{\r\n\t\t\"name\": {\r\n\t\t\t\"$exists\": true\r\n\t\t}\r\n\t}, {\r\n\t\t\"year_of_birth\": {\r\n\t\t\t\"$type\": \"int\",\r\n\t\t\t\"$lte\": 1994\r\n\t\t}\r\n\t}, {\r\n\t\t\"phone\": {\r\n\t\t\t\"$type\": \"int\"\r\n\t\t}\r\n\t}, {\r\n\t\t\"email\": {\r\n\t\t\t\"$type\": \"string\"\r\n\t\t}\r\n\t}]\r\n}",
            codeSnippetEnd: "});",
            blankOutResponseFromServer: true,
            actionButtonMessage: "Run",
            nextStateAction: function() {
                var response = $scope.createCollection();
                $scope.displayResponseFromServer = response;
                $scope.applyNextState();
            }
        };
        $scope.states.push(state);
        
        state = {
            blankOutResponseFromServer: false,
            actionButtonMessage: "Next",
            nextStateAction: function() {
                $scope.applyNextState();
            }
        };
        $scope.states.push(state);
        
        state = {
            codeSnippetStart: "db.getCollection(\"contacts\").insert({",
            codeSnippet: "{\r\n\t\"name\": \"Bob Smith\",\r\n\t\"year_of_birth\": 1995,\r\n\t\"phone\": 1234567890,\r\n\t\"email\": \"someone@company.com\"\r\n}",
            codeSnippetEnd: "});",
            blankOutResponseFromServer: true,
            actionButtonMessage: "Run",
            nextStateAction: function() {
                var response = $scope.insertIntoCollection();
                $scope.displayResponseFromServer = response;
                $scope.applyNextState();
            }
        };
        $scope.states.push(state);
        
        state = {
            blankOutResponseFromServer: false,
            actionButtonMessage: "Next",
            nextStateAction: function() {
                $scope.applyNextState();
            }
        };
        $scope.states.push(state);
        
        state = {
            blankOutResponseFromServer: true,
            actionButtonMessage: "Run",
            nextStateAction: function() {
                var response = $scope.insertIntoCollection();
                $scope.displayResponseFromServer = response;
                $scope.applyNextState();
            }
        };
        $scope.states.push(state);
        
        state = {
            blankOutResponseFromServer: false,
            actionButtonMessage: "Start Over",
            nextStateAction: function() {
                $scope.applyNextState();
            }
        };
        $scope.states.push(state);
        
        // The properties that are displayed in the front end
        // These first few properties are for displaying the current
        // state's data. They are the same as the data members found
        // in the state objects.
        $scope.displayCodeSnippetStart = "";
        $scope.displayCodeSnippet = "";
        $scope.displayCodeSnippetEnd = "";
        $scope.displayActionButtonMessage = "";
        $scope.currentNextStateAction = function() {};
        
        // These properties 
        $scope.activeStateIndex = 0;
        $scope.displayResponseFromServer = "";
        
        /**
         * Applies the state that is in the states array
         * at the specified index. 
         */
        $scope.applyState = function(indexOfStateToApply) {
            
            // Set the correct active state index
            $scope.activeStateIndex = indexOfStateToApply;
            console.log('Applying state at index ' + indexOfStateToApply);
            
            // Set all the data members from that state
            // and set their valies in the UI
            var stateToBeApplied = $scope.states[indexOfStateToApply];
            
            // We will only change the code snippet if we need to
            if(stateToBeApplied.codeSnippet) {
                $scope.displayCodeSnippetStart = stateToBeApplied.codeSnippetStart;
                $scope.displayCodeSnippet = stateToBeApplied.codeSnippet;
                $scope.displayCodeSnippetEnd = stateToBeApplied.codeSnippetEnd;
            }
            
            
            // Set the action button message
            $scope.displayActionButtonMessage = stateToBeApplied.actionButtonMessage;
            
            // Set the action to be performed when the action
            // button is pushed
            $scope.currentNextStateAction = stateToBeApplied.nextStateAction;
            
            // Clear out the server response box if the 
            // state dictates that we should do so
            if(stateToBeApplied.blankOutResponseFromServer) {
                $scope.displayResponseFromServer = "";
            }
        };
        
        $scope.applyNextState = function() {
            var nextStateIndex = $scope.getNextActiveStateIndex();
            $scope.applyState(nextStateIndex);
        };
        
        $scope.getNextActiveStateIndex = function() {
            var nextStateIndex = $scope.activeStateIndex + 1;
            // If this is the last state, we want to start over.
            nextStateIndex = nextStateIndex % $scope.states.length;
            return nextStateIndex;
        }
        
        
        
        /* API calls */
        $scope.createCollection = function() {
            return 'Successfully created';
        };
        
        $scope.insertIntoCollection = function() {
            return 'A message from the server';
        };
        
        
        
        /* When the document is ready */
        
        angular.element(document).ready(function () {
            $scope.applyState(0);
            $scope.$apply();
        });
    }
]);
