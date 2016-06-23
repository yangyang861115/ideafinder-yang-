adminApp.factory('questionListService', function ($http,$resource) {
  return {
    getQuestions: function () {
      // var data = {};
      // data.user_id = 1;
      // return $http.get('http://localhost/Bhavesh/brass_tacks/angularapi/index.php/API/questionnaires');
      var question = $resource('http://localhost/Bhavesh/brass_tacks/angularapi/index.php/API/questionnaires/');
      return question.get({user_id:'1'});
    },

    saveQuestionnaires: function () {
      d=[{
    "Mq_canvas_title": "History",
    "Mq_canvas_desc": "Details About History",
    "Question": [{
      "qu_short": "About History ?",
      "qu_quest": "What Is Lorem Ipsum ?",
      "qu_desc": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      "qu_max": "200",
      "qu_min": "200"
    }, {
      "qu_short": "Why History ?",
      "qu_quest": "Why History ?",
      "qu_desc": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
      "qu_max": "350",
      "qu_min": "350"
    }]
}];
      // console.log('dadadad');
      // var data = {};
      // data.user_id = 1;
      // data.data = data ;
      // return $http.post('http://localhost/Bhavesh/brass_tacks/angularapi/index.php/API/questionnaires');
      var question = $resource('http://localhost/Bhavesh/brass_tacks/angularapi/index.php/API/questionnaires/');
      return question.save({user_id:'1', data:d});
    }
  }
});