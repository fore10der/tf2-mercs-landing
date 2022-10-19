<script lang="ts">
    import {parentWidth} from "../actions/parentWidth";

    export let slides: string[] = []
    export let index: number = 0

    let width: number = 0

    const nextSlide = () => {
        if (index === slides.length - 1) {
            return index = 0
        }
        return index++
    }

    const prevSlide = () => {
        if (index === 0) {
            return index = slides.length - 1
        }
        return index--
    }

    $: containerStyle = `width: ${width}px; height: ${width * 0.375}px`
    $: slidesContainerStyle = `perspective: ${width / 2}px;`
</script>

<div class="container" style="{containerStyle}" use:parentWidth={(newWidth) => width = newWidth}>
    <div style="{slidesContainerStyle}" class="slides-container" >
        { #each slides as slide, slideIndex}
            <div class:slide
                 class:slide-left={slideIndex === index - 1 || index === 0 && slideIndex === slides.length - 1}
                 class:slide-central={index === slideIndex}
                 class:slide-right={slideIndex === index + 1 || index === slides.length - 1 && slideIndex === 0}
            >
                <video src={slide} autoplay muted loop width='100%'></video>
            </div>
        {/each}
    </div>
    <div class="button-navigation-container button-navigation-prev">
        <button class="button-navigation" on:click={prevSlide}>{@html '<'}</button>
    </div>
    <div class="button-navigation-container button-navigation-next">
        <button class="button-navigation" on:click={nextSlide}>{@html '>'}</button>
    </div>
</div>

<style lang="scss">
    .container {
        padding-top: 50px;
        padding-bottom: 50px;
        width: 100%;
        margin-left: auto;
        margin-right: auto;
        position: relative;
        box-sizing: content-box;
        overflow: hidden;
    }
    .button-navigation-container {
      position: absolute;
      top: 50%;
      margin-top: calc(0px - ($slider-pagination-size/ 2));
    }
    .button-navigation {
      width: $slider-pagination-size;
      height: $slider-pagination-size;
    }
    .button-navigation-next {
        right: 0;
    }
    .button-navigation-prev {
        left: 0;
    }
    .slides-container {
      width: 100%;
      justify-content: center;
      perspective-origin: 50% 50%;
      position: relative;
      display: flex;
      flex-direction: row;
    }
    .slide {
      width: 66%;
      display: none;
      flex-shrink: 0;
    }
    .slide-central {
      display: block;
      order: 1;
    }
    .slide-left {
      display: block;
      transform: rotateY(30deg);
      transform-origin: right center;
      order: 0;
    }
    .slide-right {
      display: block;
      transform: rotateY(-30deg);
      transform-origin: left center;
      order: 2;
    }
    .slide-central {
      position: relative;
    }
</style>