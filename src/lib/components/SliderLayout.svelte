<script lang="ts">
    import {parentWidth} from "../actions/parentWidth";

    export let slides: string[] = []
    export let index: number = 0

    let width: number = 0

    const calculateSlidesToRender = (slides: string[], index: number) => {

        if (index === 0) {
            return [slides.at(-1)].concat(slides.slice(0, 2))
        }
        if (index === slides.length - 1) {
            return slides.slice(-2).concat(slides.at(0))
        }
        return slides.slice(index - 1, index + 2)
    }

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
    $: slidesContainerStyle = `width: 100%; transform: translate(-${width / 2}px); perspective: ${width}px;`
    $: slidesToRender = calculateSlidesToRender(slides, index)
</script>

<div class="container" style="{containerStyle}" use:parentWidth={(newWidth) => width = newWidth}>
    <div style="{slidesContainerStyle}" class="slides-container" >
        { #each slidesToRender as slide, index}
            { #if (index != 1) }
                <div class:slide class:slide-left={index === 0} class:slide-right={index === 2}>
                    <video src={slide} autoplay muted loop width='100%'></video>
                </div>
            { :else }
                <div class:slide class:slide-central={true}>
                    <video src={slide} autoplay muted loop width='100%'></video>
                </div>
            { /if }
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
      position: relative;
      display: flex;
      flex-direction: row;
      perspective-origin: 50% 50%;
    }
    .slide {
      width: 66%;
      flex-shrink: 0;
    }
    .slide-left {
      transform: rotateY(30deg);
      transform-origin: right center;
    }
    .slide-right {
      transform: rotateY(-30deg);
      transform-origin: left center;
    }
    .slide-central {
      position: relative;
    }
</style>