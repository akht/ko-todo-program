(function() {

// TODOリストに追加するオブジェクト
	function Todo(times, title, con_c, con_d, con_e, con_f, con_g, con_h, con_i, doing, done) {
		this.times = times;
		this.title = title;
		this.con_c = con_c;
		this.con_d = con_d;
		this.con_e = con_e;
		this.con_f = con_f;
		this.con_g = con_g;
		this.con_h = con_h;
		this.con_i = con_i;
		this.doing = ko.observable(doing);
		this.done = ko.observable(done);
	}

// JSONフォーマットに変換するためにプロパティだけのオブジェクトに変換するメソッド
	Todo.prototype.toPlainObject = function() {
		return {
			times: this.times,
			title: this.title,
			con_c: this.content_c,
			con_d: this.content_d,
			con_e: this.content_e,
			con_f: this.content_f,
			con_g: this.content_g,
			con_h: this.content_h,
			con_i: this.content_i,
			doing: this.doing(),
			done: this.done()
		};
	};

	var Model = function(localStorage) {
		var self = this;

// TODOリストの配列を定義
		self.todoList = ko.observableArray([new Todo('testa','testb', 'testc', 'testd', 'teste', 'testf', 'testg', 'testh', 'testi',false, false)]);

// TODOを追加するメソッド
		self.addTodo = function(times, title, con_c, con_d, con_e, con_f, con_g, con_h, con_i, doing, done) {
			self.todoList.push(new Todo(times, title, con_c, con_d, con_e, con_f, con_g, con_h, con_i, doing, done));
		};

// TODOを削除するメソッド
		self.deleteTodo = function(todo) {
			self.todoList.remove(todo);
		};

// ローカルストレージへ保存するメソッド
		self.save = function() {
			if(localStorage) {
				var list = ko.utils.arrayMap(self.todoList(), function(todo) {
					return todo.toPlainObject();
				});
				var data = ko.utils.stringifyJson(list);
				localStorage.setItem('todoList', data);
			}
		};

// ローカルストレージから読み込むメソッド
		self.load = function() {
			if(localStorage) {
				var data = localStorage.getItem('todoList');
				if(data) {
					self.todoList.removeAll();

					var list = ko.utils.parseJson(data);
					ko.utils.arrayForEach(list, function(todo) {
						self.addTodo(todo.times, todo.title, todo.con_c, todo.con_d, todo.con_e, todo.con_f, todo.con_g, todo.con_h, todo.con_i, todo.doing, todo.done);
					});
				}
			}
		};


	};

	var ViewModel = function(model) {
		var self = this;

		self.todoList = model.todoList;
		self.deleteTodo = model.deleteTodo;

		self.titleName = ko.observable('');
		self.content_c = ko.observable('');
		self.content_d = ko.observable('');
		self.content_e = ko.observable('');
		self.content_f = ko.observable('');
		self.content_g = ko.observable('');
		self.content_h = ko.observable('');
		self.content_i = ko.observable('');

		self.timeStamp = function() {
			var date = new Date();
			var myYear = date.getFullYear();
			var myMonth = date.getMonth() + 1;
			var myDate = date.getDate();
			return myYear + "/" + myMonth + "/" + myDate;
		};

// ビューからデータを受け取りTODOの追加処理を実行するメソッド
		self.addTodo = function() {
			model.addTodo(
				self.timeStamp(),
				self.titleName(),
				self.content_c(),
				self.content_d(),
				self.content_e(),
				self.content_f(),
				self.content_g(),
				self.content_h(),
				self.content_i(),
				false,
				false
				);

			self.titleName('');
			self.content_c('');
			self.content_d('');
			self.content_e('');
			self.content_f('');
			self.content_g('');
			self.content_h('');
			self.content_i('');

		};




	};

	var model = new Model(window.localStorage);
	if(window.localStorage) {
		model.load();
		$(window).on('beforeunload', model.save);
	}

	ko.applyBindings(new ViewModel(model));


})();
