/*===========  DESKTOP SLAYDER  ===========*/
document.querySelectorAll('.service_img_slider').forEach(wrapper => {
    const slides = wrapper.querySelectorAll('.slide');
    const dots = wrapper.querySelectorAll('.dot');
    const prev = wrapper.querySelector('.prev');
    const next = wrapper.querySelector('.next');
    let cur = 0, auto, fadeDur = 600;

    function show(idx) {
        cur = (idx + slides.length) % slides.length;
        slides.forEach((s, i) => {
            s.style.opacity = i === cur ? '1' : '0';
            s.style.position = i === cur ? 'relative' : 'absolute';
        });
        dots.forEach((d, i) => d.classList.toggle('active', i === cur));
    }
    function nextSlide() { show(cur + 1); }
    function prevSlide() { show(cur - 1); }

    slides.forEach((s, i) => { if (i !== 0) s.style.opacity = '0'; s.style.transition = `opacity ${fadeDur / 1000}s`; });
    show(0);
    next.addEventListener('click', () => { clearInterval(auto); nextSlide(); autoPlay(); });
    prev.addEventListener('click', () => { clearInterval(auto); prevSlide(); autoPlay(); });
    dots.forEach((d, i) => d.addEventListener('click', () => { clearInterval(auto); show(i); autoPlay(); }));
    function autoPlay() { auto = setInterval(nextSlide, 4000); }
    autoPlay();
});

/*===========  RESPONSİV SLAYDER  ===========*/
document.querySelectorAll('.resp_slider').forEach(wrapper => {
    const slides = wrapper.querySelectorAll('.resp_slide');
    const prev = wrapper.querySelector('.resp_prev');
    const next = wrapper.querySelector('.resp_next');
    let cur = 0, auto;

    function showResp(idx) {
        cur = (idx + slides.length) % slides.length;
        wrapper.querySelector('.resp_slides').style.transform = `translateX(-${cur * 100}%)`;
    }
    function nextResp() { showResp(cur + 1); }
    function prevResp() { showResp(cur - 1); }

    next.addEventListener('click', () => { clearInterval(auto); nextResp(); autoPlayResp(); });
    prev.addEventListener('click', () => { clearInterval(auto); prevResp(); autoPlayResp(); });
    function autoPlayResp() { auto = setInterval(nextResp, 4000); }
    autoPlayResp();
});