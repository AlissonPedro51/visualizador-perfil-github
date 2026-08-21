const inputSearch = document.getElementById("input-search");
const btnSearch = document.getElementById("btn-search");
const profileResults = document.querySelector(".profile-results");

const BASE_URL = "https://api.github.com";

btnSearch.addEventListener("click", async () => {
    const userName = inputSearch.value.trim();

    if (!userName) {
        alert("Por favor, digite um nome de usuário do GitHub.");
        return;
    }

    profileResults.innerHTML = "<div class='loading'>Carregando...</div>";

    try {
        const response = await fetch(`${BASE_URL}/users/${userName}`);

        if (!response.ok) {
            profileResults.innerHTML = "<div class='loading'>Usuário não encontrado.</div>";
            alert("Usuário não encontrado. Por favor, verifique o nome de usuário e tente novamente.");
            return;
        }

        const userData = await response.json();

        profileResults.innerHTML = `
            <div class="profile-card">
                <img src="${userData.avatar_url}" alt="Avatar de ${userData.name}" class="profile-avatar">
                <div class="profile-info">
                    <h2 class="profile-name">${userData.name}</h2>
                    <p class="profile-bio">${userData.bio || "Não possui bio cadastrada 😢."}</p>
                    <p class="profile-followers">Seguidores: ${userData.followers}</p>
                    <p class="profile-following">Seguindo: ${userData.following}</p>
                </div>
            </div>`;
    } catch (error) {
        console.error("Erro ao buscar o perfil do usuário:", error);
        profileResults.innerHTML = "<div class='loading'>Erro ao carregar.</div>";
        alert("Ocorreu um erro ao buscar o usuário. Por favor, tente novamente mais tarde.");
    }
});

