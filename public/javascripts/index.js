/**
 * The Angular controller
 */
angular.module('LearnMongoApp',['ui.router'])
.controller('LearnMongoCtrl', ['$scope', '$http', function($scope, $http) {
        
        // First initialize the states array
        $scope.states = [];
        
        // Add all the states to it
        var state = {
            codeSnippetStart: "db.createCollection(\"contacts\", ",
            codeSnippet: "Code snippet",
            codeSnippetEnd: "});",
            actionButtonMessage: "Run",
            nextStateAction: function() {alert('Going to the next state action')}
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
         * Applies the state that is in the 
         */
        $scope.applyState = function(indexOfStateToApply) {
            
            // Set the correct active state index
            $scope.activeStateIndex = indexOfStateToApply;
            
            // Set all the data members from that state
            // and set their valies in the UI
            var stateToBeApplied = $scope.states[indexOfStateToApply];
            $scope.displayCodeSnippetStart = stateToBeApplied.codeSnippetStart;
            $scope.displayCodeSnippet = stateToBeApplied.codeSnippet;
            $scope.displayCodeSnippetEnd = stateToBeApplied.codeSnippetEnd;
            $scope.displayActionButtonMessage = stateToBeApplied.actionButtonMessage;
            $scope.currentNextStateAction = stateToBeApplied.nextStateAction;
            
            // Clear out the server response box
            $scope.displayResponseFromServer = "";
            
            // Apply all the changes we just made
            $scope.$apply();
        };

        $scope.getNextActiveStateIndex = function() {
            
        }
        
        $scope.applyNextState = function() {
            var nextStateIndex = $scope.getNextActiveStateIndex();
            $scope.applyState(nextStateIndex);
        };
        
        angular.element(document).ready(function () {
            console.log("We are ready to apply some state");
            $scope.applyState(0);
        });
    }
]);
