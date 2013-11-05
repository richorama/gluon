# gluon.js

### Work in progress. Please feel free to contirbute.

Dynamic templating for bootstrap.

## Examples

If you have a JavaScript object in the browser like this:

```js
var demo = { 
	firstName : "Richard", 
	last_name : "Astbury", 
	checkBoxTrue : true, 
	false, age:36};
```

You can create an HTML form with the `edit` function:

```js
$("#edit").html(Gluon.edit(demo));
```

Which looks like this:

![Edit](https://dl.dropboxusercontent.com/u/624582/github/gluon/edit.png)

You can create an HTML form to just display the values with the `view` function:

```js
$("#view").html(Gluon.view(demo));
```

Which looks like this:

![View](https://dl.dropboxusercontent.com/u/624582/github/gluon/view.png)

You can create a table of objects like this:

```js
$("#view").html(Gluon.table([demo,demo,demo]));
```

![Table](https://dl.dropboxusercontent.com/u/624582/github/gluon/table.png)


## Options

An options object can be passed in as a second argument, with the following fields:

* `ignoreList` an array of strings, containing the field names to ignore.
* `sessionId` a value to append to the class of the input elements, allowing you to use jQuery (or simliar) to 

## License

MIT

