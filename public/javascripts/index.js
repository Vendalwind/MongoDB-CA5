/**
 * The Angular controller
 */
angular.module('LearnMongoApp',['ui.router'])
.controller('LearnMongoCtrl', ['$scope', '$http', function($scope, $http) {
        
        /* States */
        
        $scope.states = [];
        
        // Add all the states to it
        var state = {
            title: "Create a validated collection",
            explanation: "<p>In order for a collection to be validated, a <em>validator</em> argument must be passed in when the collection is created.</p><br><br><p>In this case, the validator will check that every document that is inserted into the collection will have the following fields:<ul><li>name</li><li>year_of_birth, with a value less than or equal to 1994</li><li>phone, and that the valiue is an integer</li><li>email, and that the value is a string</li></ul><br><br><p>Run the code at the right to create your first validated collection!</p>",
            codeSnippetStart: "db.createCollection(\"contacts\", ",
            codeSnippet: "{\r\n\t\"validator\": {\r\n\t\t\"$and\": [{\r\n\t\t\t\"name\": {\r\n\t\t\t\t\"$exists\": true\r\n\t\t\t}\r\n\t\t}, {\r\n\t\t\t\"year_of_birth\": {\r\n\t\t\t\t\"$type\": \"int\",\r\n\t\t\t\t\"$lte\": 1994\r\n\t\t\t}\r\n\t\t}, {\r\n\t\t\t\"phone\": {\r\n\t\t\t\t\"$type\": \"int\"\r\n\t\t\t}\r\n\t\t}, {\r\n\t\t\t\"email\": {\r\n\t\t\t\t\"$type\": \"string\"\r\n\t\t\t}\r\n\t\t}]\r\n\t}\r\n}",
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
            title: "Create a validated collection",
            explanation: "<p>In order for a collection to be validated, a <em>validator</em> argument must be passed in when the collection is created.</p><br><br><p>In this case, the validator will check that every document that is inserted into the collection will have the following fields:<ul><li>name</li><li>year_of_birth, with a value less than or equal to 1994</li><li>phone, and that the valiue is an integer</li><li>email, and that the value is a string</li></ul><br><br><p>Run the code at the right to create your first validated collection!</p>",
            blankOutResponseFromServer: false,
            actionButtonMessage: "Next",
            nextStateAction: function() {
                $scope.applyNextState();
            }
        };
        $scope.states.push(state);
        
        state = {
            title: "Validation in action",
            explanation: "<p>To see validation in action, try inserting the following document into the collection.<br><br><p><strong>What do you expect will happen? Why?</strong></p><br><br><p>When you think you know the answer, run the code at the right to see what happens.</p>",
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
            title: "Validation in action",
            explanation: "<p>To see validation in action, try inserting the following document into the collection.<br><br><p><strong>What do you expect will happen? Why?</strong></p><br><br><p>When you think you know the answer, run the code at the right to see what happens.</p><br><br><p><strong>The document didn't insert because the validation constraints were not met.</strong></p><br><br><p>Hit next to continue.</p>",
            blankOutResponseFromServer: false,
            actionButtonMessage: "Next",
            nextStateAction: function() {
                $scope.applyNextState();
            }
        };
        $scope.states.push(state);
        
        state = {
            title: "Fix the document to pass validation",
            explanation: "<p>Fix the document at the right so that it passes validation.</p><br><br><p><strong>What modifications do you need to make? Why?</strong></p><br><br><p>Run the code at the right when you think it's ready.</p>",
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
            title: "Fix the document to pass validation",
            explanation: "<p>Did it come back with an \"ok\" response? If so, congrats! If not, better luck next time!</p>",
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
        $scope.displayTitle = "";
        $scope.displayCodeSnippetStart = "";
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
            
            // Set the title
            $scope.displayTitle = stateToBeApplied.title;
            
            // Set the explanation pane on the left-hand side of the page
            document.getElementById('leftColumn').innerHTML = stateToBeApplied.explanation;
            
            // We will only change the code snippet if we need to
            if(stateToBeApplied.codeSnippet) {
                $scope.displayCodeSnippetStart = stateToBeApplied.codeSnippetStart;
                document.getElementById('codeEditor').value = stateToBeApplied.codeSnippet;
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
            var options = JSON.parse(document.getElementById('codeEditor').value);
            var payload = {
                name: 'contacts',
                options: options
            };
            console.log(payload);
            $http.post('/mongo/collections', JSON.stringify(payload))
            .success(function(data) {
                $scope.displayResponseFromServer = JSON.stringify(data, null, 4);
            })
            .error(function(data) {
                $scope.displayResponseFromServer = JSON.stringify(data, null, 4);
            });
        };
        
        $scope.insertIntoCollection = function() {
            var payload = JSON.parse(document.getElementById('codeEditor').value);
            console.log(payload);
            $http.post('/mongo/collections/contacts', JSON.stringify(payload))
            .success(function(data) {
                $scope.displayResponseFromServer = JSON.stringify(data, null, 4);
            })
            .error(function(data) {
                $scope.displayResponseFromServer = JSON.stringify(data, null, 4);
            });
        };
        
        
        
        /* When the document is ready */
        
        angular.element(document).ready(function () {
            $scope.applyState(0);
            $scope.$apply();
        });
    }
]);
