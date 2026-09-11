"use client";

import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    grade: "",
    where: "",
    pain: "",
    consent: false,
  });
  const [status, setStatus] = useState("idle"); // idle | sending | done | error

  function update(key) {
    return (e) => {
      const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
      setForm((f) => ({ ...f, [key]: value }));
    };
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.phone || !form.grade || !form.consent) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("done");
    } catch (err) {
      setStatus("error");
    }
  }

  return (
    <>
      <nav>
        <div className="wrap">
          <div className="brand">
            막힌곳<span>.</span>
          </div>
          <a className="small" href="#apply">
            무료 진단 신청
          </a>
        </div>
      </nav>

      <section className="hero">
        <div className="wrap">
          <h1>
            학원은 진도를 알려주고,
            <br />
            우리는 막힌 곳을 알려드립니다.
          </h1>
          <p className="lead">
            아이의 수학 오답 사진을 보내주시면, 어느 단원의 어떤 단계에서 막히는지{" "}
            <strong>실제 풀이 근거와 함께</strong> 리포트로 정리해 드립니다. 점수가 아니라 원인을 보는
            리포트입니다.
          </p>
          <a className="btn pen" href="#apply">
            무료 진단 신청하기
          </a>
          <p className="note">첫 5명 무료 · 48시간 안에 리포트 전달 · 학원·과외와 별개로 받을 수 있습니다</p>
        </div>
      </section>

      <section>
        <div className="wrap">
          <h2>리포트는 이렇게 생겼습니다</h2>
          <div className="report">
            <span className="stamp">샘플</span>
            <div className="report-head">
              <b>고1 · 이차방정식 · 오답 4번</b>
              <span>2026.09</span>
            </div>
            <div className="problem">
              이차방정식 x² − (k+1)x + 2k = 0 의{" "}
              <span className="cond got">두 근이 모두 양수</span>일 때, 실수 k의 값의 범위를 구하시오.
            </div>
            <ul className="findings">
              <li className="ok">개념: 근과 계수의 관계, 판별식 — 알고 있음 (다른 문제에서 정확히 사용)</li>
              <li className="ok">"두 근이 양수" → 판별식 D ≥ 0 — 꺼냄</li>
              <li className="no">"두 근이 양수" → 두 근의 합 &gt; 0 — 놓침</li>
              <li className="no">"두 근이 양수" → 두 근의 곱 &gt; 0 — 놓침</li>
            </ul>
            <div className="verdict">
              <b>진단:</b> 개념은 알고 있습니다. 문제의 조건에서 꺼내야 할 정보 <b>세 가지 중 한 가지만</b>{" "}
              꺼내는 단계에서 막힙니다. 개념 수업을 더 들어도 나아지지 않는 유형입니다.
            </div>
            <p className="rx">
              <b>2주 처방:</b> 개념 복습 대신 "이 조건에서 뭘 쓸 수 있나"를 먼저 적고 푸는 훈련 — 교재 ○○
              p.84–91 (조건 3개 이상인 문제만), 하루 4문제.
            </p>
          </div>
          <p className="caption">
            모든 리포트에는 아이가 실제로 쓴 풀이가 캡처로 들어갑니다. "느낌"이 아니라 근거로 말씀드립니다.
          </p>
        </div>
      </section>

      <section>
        <div className="wrap">
          <h2>같은 오답, 다른 답</h2>
          <div className="compare">
            <div className="them">
              <small>학원 상담에서 듣는 말</small>
              <p>"이차방정식 파트가 약해요. 개념 반복 좀 더 하면 됩니다."</p>
            </div>
            <div className="us">
              <small>리포트가 말하는 것</small>
              <p>"개념은 알아요. 조건 하나에서 정보 세 개를 꺼내야 하는데 하나만 꺼냅니다. 개념 반복은 답이 아닙니다."</p>
            </div>
          </div>
          <div className="who">
            <p>
              리포트를 만드는 사람은 <strong>고려대학교 의공학부</strong> 재학생으로, 현재 수학학원에서 매일
              학생들의 질문에 답하는 조교로 일하고 있습니다. 수학을 잘 푸는 사람보다,{" "}
              <mark>남이 왜 틀리는지를 매일 보는 사람</mark>이 진단을 합니다.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <h2>진단하는 사람의 실력부터</h2>
          <div className="scores">
            <div>
              <small>2020학년도 수능 · 수학 가형</small>
              <b>1등급</b>
              <span>백분위 96 · 표준점수 128</span>
            </div>
            <div>
              <small>2022학년도 수능 · 수학 미적분</small>
              <b>1등급</b>
              <span>백분위 99 · 표준점수 144</span>
            </div>
          </div>
          <p className="caption">
            두 번 모두 1등급, 두 번째엔 백분위 96에서 99로. 점수를 직접 올려본 사람이라 어디서 막히는지
            압니다. 성적증명서 원본은 요청 시 확인해 드립니다.
          </p>
          <ul className="timeline">
            <li>
              <small>2020 ~</small>
              <b>개인 과외</b>
              <span>중2 ~ 고3 전 학년</span>
            </li>
            <li>
              <small>2021.12 ~ 2023.06</small>
              <b>메가스터디 오르새</b>
              <span>수학 조교</span>
            </li>
            <li>
              <small>2023.12 ~ 2024.05</small>
              <b>광교 · 용인수지 수학학원 2곳</b>
              <span>수학 조교</span>
            </li>
            <li className="now">
              <small>2026.08 ~ 현재</small>
              <b>수학학원 질의응답 조교</b>
              <span>고등부</span>
            </li>
          </ul>
        </div>
      </section>

      <section>
        <div className="wrap">
          <h2>막히는 곳은 이 다섯 단계 중 하나입니다</h2>
          <p style={{ marginBottom: 18 }}>
            2024년부터 수능 킬러 문항 10개를 같은 순서로 풀어 블로그에 올렸습니다. 어떤 문제든 순서는
            바뀌지 않았습니다. 학생 풀이를 이 순서에 대조하면 어느 단계에서 끊겼는지가 보입니다.
          </p>
          <ol className="routine">
            <li>
              <div>
                <b>조건 정리</b>
                <span>문제의 모든 조건을 번호 붙여 텍스트로 옮긴다</span>
              </div>
            </li>
            <li className="hot">
              <div>
                <b>조건 해석</b>
                <span>각 조건에서 꺼낼 수 있는 정보를 전부 꺼낸다</span>
              </div>
            </li>
            <li className="hot">
              <div>
                <b>조건 묶기 · 그래프 추론</b>
                <span>연관된 조건끼리 묶고, 식과 그래프를 동시에 그린다</span>
              </div>
            </li>
            <li>
              <div>
                <b>조건 활용 · 함수 확정</b>
                <span>묶인 정보로 함수를 확정하고 계산한다</span>
              </div>
            </li>
            <li>
              <div>
                <b>총평</b>
                <span>무엇을 놓치면 이 문제를 못 푸는지 한 줄로 남긴다</span>
              </div>
            </li>
          </ol>
          <p className="caption">
            <strong style={{ color: "var(--pen)" }}>2·3단계</strong>에서 막히는 학생이 가장 많고, 개념
            반복으로는 안 고쳐집니다.
          </p>
        </div>
      </section>

      <section>
        <div className="wrap">
          <h2>틀린 문제가 아니라, 틀린 생각을 적습니다</h2>
          <p style={{ marginBottom: 18 }}>
            리포트 2쪽은 학생의 <strong>사고 기록</strong>입니다. 풀면서 실제로 든 생각을 조건 옆에 한 줄씩
            적고, 채점 후에는 답이 아니라 그 생각 중 어디가 빠졌는지를 봅니다. 같은 문제를 다시 맞히는 게
            아니라, 같은 종류의 실수를 다시 안 하는 게 목표입니다.
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="shot" src="/thought-log.png" alt="학생의 사고 기록과 빨간 펜 채점 예시" />
          <p className="caption">
            첫 리포트는 오답 사진만 보내셔도 됩니다. 이 양식은 2주 처방과 함께 드리고, 2주 뒤 재제출 시
            전후 비교가 됩니다.
          </p>
        </div>
      </section>

      <section>
        <div className="wrap">
          <h2>진행 순서</h2>
          <ol className="steps">
            <li>
              <div>
                <h3>오답 사진을 보내주세요</h3>
                <p>
                  최근 시험지나 문제집의 틀린 문제 10~20장. 풀이 흔적이 남아 있는 상태 그대로가 가장
                  좋습니다. 학년과 교재 이름만 함께 적어주세요.
                </p>
              </div>
            </li>
            <li>
              <div>
                <h3>풀이를 하나씩 뜯어봅니다</h3>
                <p>틀린 문제마다 개념을 몰라서인지, 조건을 못 읽어서인지, 알고도 계산에서 틀렸는지를 나눕니다. 채점이 아니라 원인 분류입니다.</p>
              </div>
            </li>
            <li>
              <div>
                <h3>48시간 안에 리포트를 받습니다</h3>
                <p>단원별 막힌 지점 · 원인 유형과 실제 풀이 근거 · 학부모님께 드리는 한 단락 요약 · 교재 페이지까지 찍은 2주 처방. PDF 4쪽.</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section>
        <div className="wrap">
          <h2>아이는 이 중 어디에 있을까요</h2>
          <p style={{ marginBottom: 16 }}>한 학생도 단원마다 다릅니다. 리포트는 단원별로 유형을 나눠서 알려드립니다.</p>
          <div className="types">
            <div>
              <p>개념을 모르고, 문제도 못 푼다</p>
              <span className="tag">개념 결손</span>
            </div>
            <div>
              <p>개념을 안다고 생각하는데, 문제를 못 푼다</p>
              <span className="tag hot">착각 — 개념반복이 안 먹힘</span>
            </div>
            <div>
              <p>개념은 부실한데 문제는 잘 푼다 (왜 풀리는지 모름)</p>
              <span className="tag hot">패턴 암기 — 유형 바뀌면 무너짐</span>
            </div>
            <div>
              <p>개념은 확실한데 문제 조건에서 뭘 써야 할지 모른다</p>
              <span className="tag hot">조건 해석 결손</span>
            </div>
            <div>
              <p>개념도 조건도 아는데 계산에서 틀린다</p>
              <span className="tag">실행 결손</span>
            </div>
            <div>
              <p>다 아는데 어려운 문제에서만 막힌다</p>
              <span className="tag">난이도 한계</span>
            </div>
          </div>
          <p className="caption">
            빨간 표시 세 유형은 지금 점수가 괜찮아 보여도 다음 학년에서 무너지는 유형입니다. 리포트가 가장
            도움이 되는 구간입니다.
          </p>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="price">
            <span className="left">첫 5명 무료</span>
            <h2>진단 리포트 1회</h2>
            <div className="amt">
              <s>30,000원</s>0원
            </div>
            <p>무료 진단 이후 리포트가 도움이 되었다면, 2주 뒤 재진단은 10,000원입니다. 도움이 안 됐다면 아무것도 하지 않으셔도 됩니다.</p>
            <ul>
              <li>오답 10~20문제 원인 분류</li>
              <li>단원별 막힌 지점 지도</li>
              <li>실제 풀이 캡처 근거</li>
              <li>교재 페이지까지 찍은 2주 처방</li>
              <li>48시간 안에 PDF 전달</li>
            </ul>
            <a className="btn" style={{ background: "var(--white)", color: "var(--ink)" }} href="#apply">
              무료 진단 신청하기
            </a>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <h2>자주 묻는 질문</h2>
          <details>
            <summary>과외나 학원을 대체하나요?</summary>
            <p>아니요. 리포트는 "어디서 막히는지"를 알려드리는 것이고, 고치는 건 지금 다니는 학원·과외·혼자 공부 어디서든 가능합니다. 처방에 교재와 페이지를 찍어드리는 이유입니다.</p>
          </details>
          <details>
            <summary>어떤 학년이 가능한가요?</summary>
            <p>중2부터 고3까지입니다. 초등은 현재 받지 않습니다.</p>
          </details>
          <details>
            <summary>오답이 10문제가 안 되면요?</summary>
            <p>5문제 이상이면 가능합니다. 다만 문제가 적을수록 단원별 판단이 거칠어집니다.</p>
          </details>
          <details>
            <summary>사진은 어떻게 보내나요?</summary>
            <p>신청 후 안내드리는 카카오톡 채널로 보내주시면 됩니다. 사진은 리포트 작성에만 쓰고 전달 후 삭제합니다.</p>
          </details>
          <details>
            <summary>왜 무료인가요?</summary>
            <p>리포트가 실제로 도움이 되는지 확인하는 단계입니다. 첫 5명의 솔직한 피드백을 받는 대신 무료로 드립니다.</p>
          </details>
        </div>
      </section>

      <section id="apply">
        <div className="wrap">
          <h2>무료 진단 신청</h2>

          {status !== "done" && (
            <form onSubmit={handleSubmit}>
              <div className="row">
                <label>
                  학부모님 성함
                  <input value={form.name} onChange={update("name")} required placeholder="홍길동" />
                </label>
                <label>
                  연락처
                  <input
                    value={form.phone}
                    onChange={update("phone")}
                    type="tel"
                    required
                    placeholder="010-0000-0000"
                  />
                </label>
              </div>
              <div className="row">
                <label>
                  학생 학년
                  <select value={form.grade} onChange={update("grade")} required>
                    <option value="">선택</option>
                    <option>중2</option>
                    <option>중3</option>
                    <option>고1</option>
                    <option>고2</option>
                    <option>고3</option>
                  </select>
                </label>
                <label>
                  지금 다니는 곳
                  <input value={form.where} onChange={update("where")} placeholder="학원 / 과외 / 혼자 (선택)" />
                </label>
              </div>
              <label>
                요즘 수학에서 가장 답답한 점 한 줄
                <textarea
                  value={form.pain}
                  onChange={update("pain")}
                  rows={2}
                  placeholder="예: 개념은 안다는데 점수가 안 나와요"
                />
              </label>
              <label className="consent">
                <input type="checkbox" checked={form.consent} onChange={update("consent")} required />
                리포트 안내 목적으로만 연락처를 사용하는 것에 동의합니다.
              </label>
              <button className="btn pen" type="submit" disabled={status === "sending"}>
                {status === "sending" ? "접수 중..." : "무료 진단 신청하기"}
              </button>
              <p className="note" style={{ marginTop: 0 }}>
                신청 후 24시간 안에 카카오톡으로 사진 보내는 방법을 안내드립니다.
              </p>
              {status === "error" && (
                <div className="error">접수 중 문제가 생겼어요. 다시 시도해 주세요.</div>
              )}
            </form>
          )}

          {status === "done" && (
            <div className="done">신청이 접수됐습니다. 24시간 안에 연락드리겠습니다.</div>
          )}
        </div>
      </section>

      <footer>
        <div className="wrap">
          <p>막힌곳 · 문의: hello@example.com</p>
          <p>리포트는 학습 진단 자료이며, 교습 행위를 포함하지 않습니다. 사진은 리포트 작성 후 삭제됩니다.</p>
        </div>
      </footer>
    </>
  );
}
