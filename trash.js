  <div id="books" class="container">
    <div id="imageCoverUpload">
      <img src="" alt="" id="uploadedImage">
      <form id="uploadCoverForm" method="post" action="/api/cover" enctype="multipart/form-data">
        <input type="file" id="coverImageUpload" name="coverImageUpload">
      </form>
      <div id="status"></div>
    </div>
    <form action="#" id="addBook">
      <div>
        <input type="hidden" id="coverImage"/>
        <label for="title">Title: </label>
        <input type="text" id="title"/>
        <label for="author">Author: </label>
        <input type="text" id="author"/>
        <label for="dateCompleted">Release Date: </label>
        <input type="text" id="dateCompleted"/>
        <label for="keywords">Keywords: </label>
        <input type="text" id="keywords"/>
        <button id="add" class="btn btn-primary">Add</button>
      </div>
    </form>
  </div>


  
 
      if( this.sort_key === "author" || this.sort_key === "title" || this.sort_key === "dateCompleted") {
        return this.sort_direction === 1 ?
          -book.get(this.sort_key).localeCompare(book2.get(this.sort_key)) :
          book.get(this.sort_key).localeCompare(book2.get(this.sort_key));
      } else {
        debugger;
        return this.sort_direction === 1 ?
          -book.get(this.sort_key) :
          book.get(this.sort_key);
      }