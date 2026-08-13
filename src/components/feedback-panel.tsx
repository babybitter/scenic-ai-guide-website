"use client";

import { Check, Lightbulb, MessageSquareText, X } from "lucide-react";
import { useState } from "react";

export function FeedbackPanel() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <button className="button button--primary roadmap-feedback-button" type="button" onClick={() => setOpen(true)}><Lightbulb size={16} />需求 / 建议反馈</button>
      {open ? <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}><section className="feedback-modal" role="dialog" aria-modal="true" aria-labelledby="feedback-title"><button className="feedback-modal__close" type="button" onClick={() => setOpen(false)} aria-label="关闭"><X size={18} /></button>{submitted ? <div className="feedback-success"><span><Check size={24} /></span><h2>感谢你的建议</h2><p>反馈入口已完成交互预留。后续接入服务端后，你的建议将直接进入项目需求池。</p><button className="button button--primary" type="button" onClick={() => setOpen(false)}>知道了</button></div> : <><span className="eyebrow">VISITOR FEEDBACK</span><h2 id="feedback-title">告诉我们，什么会让游览更轻松？</h2><p>请站在景区访客的视角分享体验：是路线不够清楚、讲解没有及时出现，还是某项服务很难找到？具体场景会帮助我们更快判断问题。</p><div className="feedback-tips"><span><MessageSquareText size={15} />你当时在哪里、想完成什么？</span><span><MessageSquareText size={15} />实际发生了什么，期待怎样改进？</span></div><form onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}><label>反馈类型<select defaultValue="experience"><option value="experience">游览体验</option><option value="navigation">地图与路线</option><option value="guide">讲解内容</option><option value="accessibility">无障碍与适老化</option></select></label><label>你的建议<textarea required rows={5} placeholder="例如：在云水栈道入口，我想快速找到洗手间，但地图上的设施入口不够明显……" /></label><label>联系方式（选填）<input type="text" placeholder="手机号或邮箱，便于我们进一步沟通" /></label><button className="button button--primary" type="submit">提交反馈</button></form></>}</section></div> : null}
    </>
  );
}
