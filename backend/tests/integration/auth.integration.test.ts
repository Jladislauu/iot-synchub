it('POST /api/auth/login - autentica usuário válido', async () => {
  const res = await request(app)
    .post('/api/auth/login')
    .send({ email: 'admin@iot.com', password: 'password' })
    .expect(200);
  
  expect(res.body).toHaveProperty('token');
  expect(res.body.user).toHaveProperty('id');
});