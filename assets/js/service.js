angular.module('appService', ['ngResource'])
	.factory('Parse', function(){
		return {
			queryText : function(option, callback){
				var query = new Parse.Query(option.collection);
				query.exists(option.colomun);
				query.first({
					success : function(results){
						callback({result : results.get(option.colomun)});
					},
					error : function(error){
						callback({error : error});
					}
				});
			},
			saveText : function(option){
				var query = new Parse.Query(option.collection);
				query.exists(option.colomun);
				query.first({
					success : function(Collection){
						Collection.save(null, {
							success : function(collection){
								collection.set(option.colomun, option.data);
								collection.save();
							}
						});
					},
					error : function(error){
						console.log('Collection find error: ' + error);
					}
				});
			},
			saveItem : function(option, collectionName, callback){
				var Fild = Parse.Object.extend(collectionName),
					fild = new Fild();

				for(var key in option){
					fild.set(key, option[key]);
				}

				fild.save(null,{
					success : function(result){
						callback( {result : true } );
					},
					error : function(error){
						console.log('Parse save test error: ', error);		
						callback({error : error.message});				
					}
				});
				

				
			},
			getItems : function(collectionName, callback, data){
				var Fild = Parse.Object.extend(collectionName),
					query = new Parse.Query(Fild);
				if( data ){
					for(var key in data){
						query.equalTo(key, data[key]);
					}
				}
				query.find({
					success : function(result){
						callback(result);
					},
					error : function(error){
						console.log('Parse get tests ' + error);		
						callback({error : error});	
					}
				});
			},
			updateItem : function(option, collectionName, callback, data){
				var Fild = Parse.Object.extend(collectionName),
					query = new Parse.Query(Fild);

				if( data ){
					for(var key in data){
						query.equalTo(key, data[key]);
					}
				}
				query.first({
					success : function(Fild){
						Fild.save(null, {
							success : function(test){
								for(var key in option){
									if( key === 'id' ) continue;
									test.set(key, option[key]);
								}
								test.save();
								callback();
							}
						});
					}
				});
			},
			removeItem : function(collectionName, id, callback){
				var object = Parse.Object.extend(collectionName),
					query = new Parse.Query(object);

				query.equalTo('objectId', id);
				query.first({
					success : function(object){
						object.destroy({});
						callback();
					}
				});
			},
			saveFile : function(image, name, callback){
				var parseFile = new Parse.File(name, image);
				parseFile.save().then(function(result){
					callback(result);
				}, function(error){
					console.log('Save file error: ' + error);
					callback({error : error});
				});
			}
		};
	})
	.factory('Modal', function(){
		return {
			show : function(){
				$('.modal').modal('show');
			},
			hide : function(){
				$('.modal').modal('hide');
			}
		};
	});
