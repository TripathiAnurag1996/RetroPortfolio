import { memo } from 'react';
import styles from './NotepadWindow.module.css';
import { anuragContext } from '../../utils/knowledgeBase';

const CONTENT = `To whoever opens this —
I build AI products that ship.
Thousands of organic users across 60+ countries. Rated 5 stars. Zero paid acquisition.

The best AI PMs build conviction through code, not frameworks.
I've written the TypeScript, debugged the pipeline at 2am,
and still owned the roadmap, the metrics, and the GTM.

Selectively exploring Senior AI PM and Generative AI Product roles
where the ambition matches the problem size.

If that's you —
${anuragContext.basics.email}
${anuragContext.basics.linkedin}
`;

function NotepadWindow() {
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <div className={styles.menuItem}>File</div>
        <div className={styles.menuItem}>Edit</div>
        <div className={styles.menuItem}>Format</div>
        <div className={styles.menuItem}>View</div>
        <div className={styles.menuItem}>Help</div>
      </div>
      <textarea 
        className={styles.textarea} 
        value={CONTENT} 
        readOnly 
        spellCheck={false}
      />
    </div>
  );
}

export default memo(NotepadWindow);
