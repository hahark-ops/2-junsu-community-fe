document.addEventListener('DOMContentLoaded', () => {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const loginBtn = document.getElementById('loginBtn');

    // Helper text elements
    // Note: In the HTML, we need to make sure we have these elements
    // The plan mentioned <div id="emailError"> and <div id="passwordError">
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

    // Regex patterns
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

    function validateInput() {
        const email = emailInput.value;
        const password = passwordInput.value;

        let isEmailValid = false;
        let isPasswordValid = false;

        // Email Validation
        if (!email) {
            emailError.textContent = "이메일을 입력해주세요.";
            emailError.classList.add('show');
        } else if (!emailRegex.test(email)) {
            emailError.textContent = "올바른 이메일 주소 형식을 입력해주세요. (예: example@adapterz.kr)";
            emailError.classList.add('show');
        } else {
            emailError.textContent = "";
            emailError.classList.remove('show');
            isEmailValid = true;
        }

        // Password Validation
        if (!password) {
            passwordError.textContent = "비밀번호를 입력해주세요.";
            passwordError.classList.add('show');
        } else if (!passwordRegex.test(password)) {
            passwordError.textContent = "비밀번호는 8~20자, 대/소문자/숫자/특수문자를 포함해야 합니다.";
            passwordError.classList.add('show');
        } else {
            passwordError.textContent = "";
            passwordError.classList.remove('show');
            isPasswordValid = true;
        }

        // Button State
        if (isEmailValid && isPasswordValid) {
            loginBtn.disabled = false;
            loginBtn.classList.add('active');
            loginBtn.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--active-btn-color').trim();
        } else {
            loginBtn.disabled = true;
            loginBtn.classList.remove('active');
            loginBtn.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--inactive-btn-color').trim();
        }
    }

    // Event Listeners
    emailInput.addEventListener('input', validateInput);
    passwordInput.addEventListener('input', validateInput);

    // Initial check
    validateInput();

    // Form submission
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Double check just in case
        if (!loginBtn.disabled) {
            alert('로그인 성공!');
            window.location.href = '/posts';
        }
    });
});
