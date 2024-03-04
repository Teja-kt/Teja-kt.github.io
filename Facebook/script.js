let divMenu = document.createElement("div");
let divContent = document.createElement("div");
divMenu.classList.add("divMenu");
divContent.classList.add("divContent");

let userId;

const validateUser = async () => {
  userId = txtUserId.value;
  username.innerHTML = await getName(userId);
  container.innerHTML = "";

  let str = `<p class="menu" onclick="showData(1)"><i class="fa-solid fa-bookmark"></i>&nbsp&nbspFeeds [All]</p><br>
    <p class="menu" onclick="showData(2)"><i class="fa-solid fa-signs-post"></i>&nbsp&nbspMy Post</p><br>
    <p class="menu" onclick="showData(3)"><i class="fa-solid fa-image"></i>&nbsp&nbspMy Albums</p><br>
    <p class="menu" onclick="showData(4)"><i class="fa-solid fa-user"></i>&nbsp&nbspMy Profile</p><br>
    <p class="menu" onclick="showData(5)"><i class="fa-regular fa-square-check"></i>&nbsp&nbspMy Todo</p><br>
    <p class="menu" onclick="showData(6)"><i class="fa-solid fa-right-from-bracket"></i>&nbsp&nbspLogout</p>`;

  divMenu.innerHTML = str;
  container.append(divMenu);
  divContent.innerHTML = await getFeeds();
  container.append(divContent);
};

const getName = async (userId) => {
  const url = `https://jsonplaceholder.typicode.com/users/${userId}`;
  const data = await fetchData(url);
  return data.name;
};

const getFeeds = async () => {
  const url = "https://jsonplaceholder.typicode.com/posts";
  const data = await fetchData(url);
  let str = "<div><h2>Feeds [All Posts]</h2><br>";
  data.map((el) => {
    str += `<p><b>User:</b>${el.userId}</p><br>
        <p><b>Title : </b>${el.title}</p><br>
        <p><b>Body : </b>${el.body}</p><br>
        <p onclick="getComments(${el.id})" class="menu">View Comments</p><hr><br>`;
  });
  str += "</div>";
  return str;
};

const getPosts = async () => {
  const url = "https://jsonplaceholder.typicode.com/posts/";
  const data = await fetchData(url);
  let str = "<div><h2>My Posts</h2><br>";
  data.map((el) => {
    if (el.userId == userId) {
      str += `<p><b>User:</b>${el.userId}</p><br>
        <p><b>Title : </b>${el.title}</p><br>
        <p><b>Body : </b>${el.body}</p><br>
        <p onclick="getComments(${el.id})" class="menu">View Comments</p><hr><br>`;
    }
  });
  str += "</div>";
  return str;
};

const getAlbums = async () => {
  const url = `https://jsonplaceholder.typicode.com/albums/?userId=${userId}`;
  const data = await fetchData(url);
  let str = "<div><h2>My Albums</h2><br>";
  data.map((el) => {
    str += `<p><b>User:</b>${el.userId}</p><br>
        <p><b>Title : </b>${el.title}</p><br>
        <p onclick="getPhotos(${el.id})" class="menu">View Phots</p><hr><br>`;
  });
  str += "</div>";
  return str;
};

const getProfile = async () => {
  const url = `https://jsonplaceholder.typicode.com/users/?id=${userId}`;
  const data = await fetchData(url);
  let str = "<div><h2>My Profile</h2><br>";
  data.map((el) => {
    str += `<p><b>User:</b>${el.userId}</p><br>
        <p><b>Name : </b>${el.name}</p><br>
        <p><b>Mail : </b>${el.email}</p><br>
        <p><b>City : </b>${el.address.city}</p><br>
        <br>`;
  });
  str += "</div>";
  return str;
};

const getTodo = async () => {
  const url = `https://jsonplaceholder.typicode.com/todos/?userId=${userId}`;
  const data = await fetchData(url);
  let str = "<div><h2>My Todos</h2><br>";
  data.map((el) => {
    str += ` <p>`;
    if (el.completed) {
      str += `<input type="checkbox" checked/>&nbsp${el.title}</p><br><hr><br>`;
    } else {
      str += `<input type="checkbox"/>&nbsp${el.title}</p><br><hr><br>`;
    }
  });
  str += "</div>";
  return str;
};

const getPhotos = async (photosOfAlbum) => {
  const url = `https://jsonplaceholder.typicode.com/photos/?albumId=${photosOfAlbum}`;
  const data = await fetchData(url);
  console.log(data);
  let str = `<h2>My Albums</h2><br><br><div class="imageContainer"><br>`;
  data.map((el) => {
    str += `<div >
      <p><b>Id:</b>${el.id}</p><br>
          <p><b>Album Id : </b>${el.albumId}</p><br>
          <p><a href=${el.url} target="_blank"><img src="${el.thumbnailUrl}" alt="ppp" class="imagess"></a></p><hr><br></div>`;
  });
  str += "</div>";
  divContent.innerHTML = str;
  return str;
};

const getComments = async (idOfPost) => {
  const url = `https://jsonplaceholder.typicode.com/comments/?postId=${idOfPost}`;
  const data = await fetchData(url);
  let str = "<div><h2>Comments</h2><br>";
  data.map((el) => {
    if (el.postId == idOfPost) {
      str += `<p><b>Id : </b>${el.id}</p><br>
        <p><b>Email : </b>${el.email}</p><br>
        <p><b>Body : </b>${el.body}</p><br><hr>
        `;
    }
  });
  str += "</div>";
  divContent.innerHTML = str;
  return str;
};

const showData = async (pageId) => {
  if (pageId === 1) {
    divContent.innerHTML = await getFeeds();
  } else if (pageId === 2) {
    divContent.innerHTML = await getPosts();
  } else if (pageId === 3) {
    divContent.innerHTML = await getAlbums();
  } else if (pageId === 4) {
    divContent.innerHTML = await getProfile();
  } else if (pageId === 5) {
    divContent.innerHTML = await getTodo();
  } else if (pageId === 6) {
    location.reload();
  }
};

const fetchData = async (url) => {
  const response = await fetch(url);
  const data = response.json();
  return data;
};
