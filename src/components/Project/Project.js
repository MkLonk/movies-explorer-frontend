function Project() {

  return (

    <section id="project" className="project">
      <h2 className="project__title">О проекте</h2>
      <div className="project__notes">
        <div className="project__note">
          <h3 className="project__subtitle">Дипломный проект включал 5 этапов</h3>
          <p className="project__caption">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>

        <div className="project__note">
          <h3 className="project__subtitle">На выполнение диплома ушло 5 недель</h3>
          <p className="project__caption">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>

      <ul className="project__scale">
        <li className="project__scale-item project__scale-item_size_s">
          <p className="project__scale-title project__scale-title_color_green">1 неделя</p>
          <p className="project__scale-caption">Back-end</p>
        </li>
        <li className="project__scale-item project__scale-item_size_l">
          <p className="project__scale-title">4 недели</p>
          <p className="project__scale-caption">Front-end</p>
        </li>
      </ul>
    </section>
  )
}

export default Project;