console.log('Figma → Code Starter ready.');

document.getElementById('feedback-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  try {
    const response = await fetch('/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, message }),
    });

    if (response.ok) {
      alert('感謝您的回饋！');
      document.getElementById('feedback-form').reset();
    } else {
      alert('提交失敗，請稍後再試。');
    }
  } catch (error) {
    console.error('Error submitting feedback:', error);
    alert('提交失敗，請檢查您的網路連線。');
  }
});
