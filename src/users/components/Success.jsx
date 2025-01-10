import React from 'react'
import succes from '../assets/success.svg'

export const Success = ({ count }) => {
  return (
    <div className="success-block">
      <img src={succes} alt="Success" />
      <h3>Успешно!</h3>
      <p>Всем {count} пользователям отправлено приглашение.</p>
      <button className="send-invite-btn">Назад</button>
    </div>
  )
}
